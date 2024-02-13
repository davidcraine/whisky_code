Rails.application.routes.draw do
  get "map/display"
  devise_for :users
  mount MissionControl::Jobs::Engine, at: "/jobs"

  root "welcome#index"
  draw :api
  draw :web
end
