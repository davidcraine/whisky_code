# frozen_string_literal: true

require 'csv'

# Distillieries Controller
class DistilleriesController < ApplicationController
  include DistilleriesConcern
  include ModalHelper

  helper_method :current_filter

  before_action :set_distillery, only: %i[show load_gmap_iframe]

  # GET /distilleries or /distilleries.json
  def index
    filter = DistilleryFilter.new(Distillery.all)
    @distilleries = filter.by_state(current_filter).like_owner(current_query).result.order(owner_name: :asc).page(params[:page]).per(20)
    if turbo_frame_request?
      # extract the name fo the turbo frame specified in the request
      frame_name = request.headers['Turbo-Frame']
      render turbo_stream: turbo_stream.replace(frame_name, partial: 'distilleries')
    else
      render :index
    end
  end

  # GET /distilleries/1 or /distilleries/1.json
  def show; end

  def load_gmap_iframe
    @show_iframe = true
    render turbo_stream: turbo_stream.replace('iframes', partial: 'gmap_iframe')
  end

  def export_to_csv
    data = Distillery.all

    # Set up the CSV file path
    csv_file_path = Rails.root.join('tmp', 'distillery_data_tmp.csv')

    # Write data to the CSV file
    CSV.open(csv_file_path, 'w') do |csv|
      # Write the header row
      csv << (Distillery.column_names - %w[id created_at updated_at])

      # Write data rows
      data.each do |record|
        csv << record.attributes.reject { |k, _v| %w[id created_at updated_at].include?(k) }.values
      end
    end

    # Send the CSV file as a download
    send_file csv_file_path, filename: 'distillery_data.csv'
  end

  private

  def current_filter
    @current_filter = params[:filter]
  end

  def current_query
    @current_query = params[:query]
  end

  def set_distillery
    @distillery = Distillery.find(params[:id])
  end
end
