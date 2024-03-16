require 'sidekiq/web'

# Configure Sidekiq-specific session middleware
Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: "_interslice_session"

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  namespace :api do
    namespace :v1 do
      resources :movies

      post 'movies/create-from-csv', to: 'movies#create_from_csv'
    end
  end
end
