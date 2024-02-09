Rails.application.routes.draw do
  mount MissionControl::Jobs::Engine, at: "/jobs"

  draw :api
  draw :web
end
