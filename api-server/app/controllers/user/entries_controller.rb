class User::EntriesController < RestfulController
  prepend_before_action :load_and_validate_user!

  private

  def load_and_validate_user!
    @user = User.find_by_id(params[:user_id])
    if @user.nil?
      error_render("user #{params[:user_id]} not found")
    end
  end

  def collection
    @user.entries.order(:date)
  end

  def filtered_collection
    if params[:from].present? || params[:to].present?
      collection.in_range(params[:from], params[:to])
    else
      collection
    end
  end

  def permitted_params
    params.require(:entry).permit(
      :readable_time,
      :distance_in_metre,
      :date)
  end

  def model_name
    'entry'
  end

  def authorize!
    only!(User::ROLE_ADMIN)
  end
end
