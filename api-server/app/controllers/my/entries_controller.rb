class My::EntriesController < RestfulController
  private

  def collection
    current_user.entries
  end
end
