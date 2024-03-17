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

  get 'movies/find-by-user', to: 'movies#find_by_user'
  get 'movies/show/:id', to: 'movies#show'
  get 'movies', to: 'movies#index'
  post 'movies', to: 'movies#create'

  resources :ratings

  post 'movies/create-from-csv', to: 'movies#create_from_csv'
  post 'ratings/create-from-csv', to: 'ratings#create_from_csv'
end
