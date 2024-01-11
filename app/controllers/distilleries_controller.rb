class DistilleriesController < ApplicationController
  before_action :set_distillery, only: %i[ show ]

  # GET /distilleries or /distilleries.json
  def index
    @distilleries = Distillery.all
  end

  # GET /distilleries/1 or /distilleries/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_distillery
      @distillery = Distillery.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def distillery_params
      params.fetch(:test, {})
    end
end
