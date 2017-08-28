Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  post '/login', controller: 'tokens', action: 'create'
  post '/register', controller: 'users', action: 'create'
  resource :current_user, controller: 'current_user'
end
