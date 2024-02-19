Rails.application.routes.draw do
  devise_for :users
  mount MissionControl::Jobs::Engine, at: "/jobs"

  root "welcome#index"
  draw :api
  draw :web
end
