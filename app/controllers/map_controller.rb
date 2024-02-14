class MapController < ApplicationController
  include DistilleriesHelper

  def display; end

  def heatmap_data
    render json: Distillery.by_state(params[:state]).map(&:coordinates!)
  end

  private

  def current_state
    params[:state]
  end
  helper_method :current_state
end
