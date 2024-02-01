Rails.application.routes.draw do
  mount MissionControl::Jobs::Engine, at: "/jobs"

  get "welcome/index"
  resources :tests
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'welcome#index'

  resources :distilleries, only: %i[index show] do
    member do
      post :load_gmap_iframe
    end
  end
end
