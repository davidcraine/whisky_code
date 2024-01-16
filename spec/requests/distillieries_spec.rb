require 'rails_helper'

RSpec.describe "Distillieries", type: :request do
  let!(:distillery) { create :distillery }

  describe "GET /index" do
    it 'should get the distilleries list' do
      get distilleries_path
      expect(response).to have_http_status(:ok)
      expect(response).to render_template(:index)
    end
  end

  describe "GET /show" do
    it 'should show the desingated distillery' do
      get distillery_path(id: distillery.id)
      expect(response).to have_http_status(:ok)
      expect(response).to render_template(:show)
    end
  end
end
