class UsersController < RestfulController
  private

  def permitted_params
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

  def collection
    User.all
  end

  def model_name
    'user'
  end
end
