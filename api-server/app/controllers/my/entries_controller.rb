class My::EntriesController < RestfulController
  skip_before_action :authorize!

  private

  def collection
    current_user.entries
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
      :time_in_second,
      :distance_in_metre,
      :date)
  end

  def model_name
    'entry'
  end
end
