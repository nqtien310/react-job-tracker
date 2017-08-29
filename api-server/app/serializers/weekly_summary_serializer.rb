class WeeklySummarySerializer < ActiveModel::Serializer
  attributes :start_date, :end_date
  attributes :distance_in_metre, :speed
end
