class MapController < ApplicationController
  def display; end

  def heatmap_data
    render json: Distillery.by_state(params[:state]).map(&:coordinates!)
  end
end
