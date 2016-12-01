Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'registrations'
  }
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :playlists
  end

  resources :playlists, only: [] do
    resources :songs, only: [:create, :update, :destroy ]
  end

end
