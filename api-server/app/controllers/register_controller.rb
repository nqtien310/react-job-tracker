class RegisterController < ApplicationController
  skip_before_action :authenticate!, only: :create

  def create
    user = User.new(user_params)

    if(user.valid?)
      user.save
      ok_render(message: "Register user with #{user.email} successfully")
    else
      error_render(user.errors.full_messages)
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :full_name,
      :password,
      :role,
      :password_confirmation)
  end
end
