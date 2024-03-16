require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  devise_for :users,
             defaults: { format: :json },
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

  resources :movies
  resources :user_movies

  post 'movies/create-from-csv', to: 'movies#create_from_csv'
  post 'user_movies/create-from-csv', to: 'user_movies#create_from_csv'
end
