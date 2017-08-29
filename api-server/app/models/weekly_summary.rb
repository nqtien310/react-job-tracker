class WeeklySummary < ActiveModelSerializers::Model
  attr_reader :start_date, :end_date, :entries

  def initialize(entries, start_date, end_date)
    @entries    = entries
    @start_date = start_date
    @end_date   = end_date
  end

  def distance_in_metre
    @entries.sum(&:distance_in_metre)
  end

  def speed
    (@entries.sum(&:speed)/@entries.size.to_f).round(2)
  end
end
