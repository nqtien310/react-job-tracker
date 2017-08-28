class My::EntriesController < RestfulController
  skip_before_action :authorize!

  private

  def collection
    current_user.entries
  end

  def permitted_params
    params.require(:entry).permit(
      :time_in_second,
      :distance_in_metre,
      :date)
  end

  def model_name
    'entry'
  end
end
