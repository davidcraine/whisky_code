Rails.application.routes.draw do
  mount MissionControl::Jobs::Engine, at: "/jobs"

  root "welcome#index"
  draw :api
  draw :web
end
