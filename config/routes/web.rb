Rails.application.routes.draw do
  get "welcome/index"

  resources :tests
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
  get 'map/display'
  get 'map/heatmap_data', format: :json

  resources :distilleries, only: %i[index show] do
    member do
      post :load_gmap_iframe
    end
    collection do
      get :export_to_csv
    end
  end

  resources :products
end
