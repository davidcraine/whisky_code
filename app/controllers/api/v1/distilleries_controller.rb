class Api::V1::DistilleriesController < Api::ApiController
  def index
    distilleries = Distillery.all
    render json: distilleries, each_serializer: DistillerySerializer
  end

  def show
    distillery = Distillery.find(params[:id])
    render json: distillery, serializer: DistillerySerializer
  end
end
