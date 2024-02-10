class Api::ApiController < ApplicationController
  before_action :authenticate_user_from_token!

  private

  def authenticate_user_from_token!
    token = request.headers['Authorization']&.split(' ')&.last.presence
    user = token && User.find_by(authentication_token: token)

    if user
      sign_in user, store: false
    else
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
