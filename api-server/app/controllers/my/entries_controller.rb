class My::EntriesController < RestfulController
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
