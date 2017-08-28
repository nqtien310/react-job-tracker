Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  post '/login', controller: 'tokens', action: 'create'

  #This shares the same Controller & Action yet it will be
  #called in different context
  post '/register', controller: 'register', action: 'create'

  resources 'users'

  namespace 'my' do
    resource :user, controller: 'user'
  end
end
