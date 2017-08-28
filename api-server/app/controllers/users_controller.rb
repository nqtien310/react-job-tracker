class UsersController < ApplicationController
  before_action :authorize!
  before_action :load_and_validate_user!, only: [:update, :destroy]

  def create
    user = User.new(user_params)

    if(user.valid?)
      user.save
      ok_render(message: "Create user with #{user.email} successfully")
    else
      error_render(user.errors.full_messages)
    end
  end

  def update
    if(@user.update_attributes(user_params))
      ok_render(message: "Update user #{@user.email} successfully")
    else
      error_render(@user.errors.full_messages)
    end
  end

  def destroy
    if(@user.destroy)
      ok_render(message: "Deleted user #{@user.email}")
    else
      error_render(@user.errors.full_messages)
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

  def authorize!
    only!(User::ROLE_MANAGER, User::ROLE_ADMIN)
  end

  def load_and_validate_user!
    @user = User.find_by_id(params[:id])
    if @user.nil?
      error_render("User #{params[:id]} not found")
    end
  end
end
