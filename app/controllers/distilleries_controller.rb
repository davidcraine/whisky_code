# frozen_string_literal: true

# Distillieries Controller
class DistilleriesController < ApplicationController
  before_action :set_distillery, only: %i[show load_gmap_iframe]

  # GET /distilleries or /distilleries.json
  def index
    @distilleries = Distillery.page(params[:page]).per(20)
  end

  # GET /distilleries/1 or /distilleries/1.json
  def show; end

  def load_gmap_iframe
    @show_iframe = true
    render turbo_stream: turbo_stream.replace('iframes', partial: 'gmap_iframe')
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_distillery
    @distillery = Distillery.find(params[:id])
  end

end
