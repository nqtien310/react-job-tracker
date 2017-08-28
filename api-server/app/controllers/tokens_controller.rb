class TokensController < ApplicationController
  def create
    if params[:user]
      email    = params[:user][:email]
      password = params[:user][:password]

      user = User.find_by_email(email)
      if(user && user.authenticate(password))
        ok_render({token: generate_token(user)}) and return
      end
    end

    error_render('Invalid username or password')
  end

  private

  def generate_token(user)
    JWT.encode({user_id: user.id}, secret, 'HS256')
  end

  def secret
    Rails.application.secrets[:secret_key_base]
  end
end
