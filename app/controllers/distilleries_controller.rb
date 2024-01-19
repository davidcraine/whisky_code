# frozen_string_literal: true

# Distillieries Controller
class DistilleriesController < ApplicationController
  before_action :set_distillery, only: %i[show load_gmap_iframe]

  # GET /distilleries or /distilleries.json
  def index
    @distilleries = filtered_distilleries.order(owner_name: :asc).page(params[:page]).per(20)
  end

  # GET /distilleries/1 or /distilleries/1.json
  def show; end

  def load_gmap_iframe
    @show_iframe = true
    render turbo_stream: turbo_stream.replace('iframes', partial: 'gmap_iframe')
  end

  def search
    @posts = Post.where('title LIKE ?', "%#{params[:query]}%")
    render partial: 'posts/search_results', locals: { posts: @posts }
  end

  private

  def filtered_distilleries
    return Distillery.all unless current_filter.present? && current_filter != 'All'

    Distillery.by_state(current_filter)
  end

  def current_filter
    @current_filter = params[:filter]
  end

  def set_distillery
    @distillery = Distillery.find(params[:id])
  end
end
