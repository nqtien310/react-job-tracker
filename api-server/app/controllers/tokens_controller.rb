class TokensController < ApplicationController
  skip_before_action :authenticate!

  def create
    if params[:user]
      email    = params[:user][:email]
      password = params[:user][:password]

      user = User.find_by_email(email)
      if(user && user.authenticate(password))
        ok_render({token: Tokenizer.encode({user_id: user.id}), role: user.role}) and return
      end
    end

    error_render('Invalid username or password')
  end

  private
end
