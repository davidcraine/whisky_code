class ProductsController < ApplicationController
  before_action :set_product, only: %i[show edit update destroy destroy_image create_comment destroy_comment]

  # GET /products or /products.json
  def index
    @products = Product.all
  end

  # GET /products/1 or /products/1.json
  def show
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit; end

  # POST /products or /products.json
  def create
    @product = Product.new(product_params.except(:images))
    @product.images.attach(product_params[:images])

    respond_to do |format|
      if @product.save
        format.html { redirect_to product_url(@product), notice: "Product was successfully created." }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1 or /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params.except(:images))
        @product.images.attach(product_params[:images])
        format.html { redirect_to product_url(@product), notice: "Product was successfully updated." }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1 or /products/1.json
  def destroy
    @product.destroy!

    respond_to do |format|
      format.html { redirect_to products_url, notice: "Product was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def destroy_image
    @product.images.find(params[:image_id]).purge
    head :no_content
  end

  def create_comment
    @comment = @product.comments.build(comment_params)

    if @comment.save
      respond_to do |format|
        format.html { redirect_to @product }
        format.turbo_stream do
          render turbo_stream: turbo_stream.append("comments", @comment)
        end
      end
    else
      # Handle errors
    end
  end

  def destroy_comment
    @product.comments.find(params[:comment_id])&.destroy!
    @product.reload
    respond_to do |format|
      format.html { redirect_to @product }
      format.turbo_stream do
        # render turbo_stream: turbo_stream.replace("comments", "<div id='comments'>" + render_to_string(@product.comments) + "</div")
        render turbo_stream: turbo_stream.replace("comments", partial: 'comments/comments', locals: { comments: @product.comments })
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.fetch(:product, {}).permit(:name, :description, :distillery_id, images: [])
  end

  def comment_params
    params.fetch(:comment, {}).permit(:content, :id)
  end
end
