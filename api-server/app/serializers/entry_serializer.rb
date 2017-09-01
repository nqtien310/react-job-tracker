class EntrySerializer < ActiveModel::Serializer
  attributes :id, :time_in_second, :distance_in_metre, :formatted_date, :speed, :date

  def date
    object.formatted_date
  end
end
