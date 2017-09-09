class EntrySerializer < ActiveModel::Serializer
  attributes :id, :time_in_second, :distance_in_metre, :formatted_date, :speed, :date
  attributes :formatted_distance, :formatted_speed
  attributes :readable_time

  def date
    object.formatted_date
  end
end
