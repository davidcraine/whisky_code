# frozen_string_literal: true

# Distillieries Controller
class DistilleriesController < ApplicationController
  include DistilleriesConcern

  before_action :set_distillery, only: %i[show load_gmap_iframe]

  # GET /distilleries or /distilleries.json
  def index
    puts request.inspect
    filter = DistilleryFilter.new(Distillery.all)
    @distilleries = filter.by_state(current_filter).like_owner(current_query).result.order(owner_name: :asc).page(params[:page]).per(20)
    if turbo_frame_request?
      render turbo_stream: turbo_stream.replace('distilleries-frame', partial: 'distilleries')
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
