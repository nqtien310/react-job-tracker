class Entry < ApplicationRecord
  include UnitFormattable
  validates :distance_in_metre, presence: true
  validates :readable_time, presence: true
  validates :date, presence: true, uniqueness: { scope: 'user_id' }
  validates :user, presence: true

  before_save :set_time_in_second
  before_save :set_speed

  belongs_to :user

  class << self
    def in_range(from_str, to_str)
      from = parse_search_date(from_str)
      to   = parse_search_date(to_str)
      output = self.all
      output = output.where('date >= ?', from) if from.present?
      output = output.where('date <= ?', to)   if to.present?
      output
    end

    def parse_search_date(date)
      case
      when date.is_a?(Time) then date
      when date.is_a?(Date) then date
      when date.is_a?(String) then Date.parse(date)
      else nil
      end
    end
  end

  #Average speed in m/s
  def set_speed
    self.speed = (distance_in_metre.to_f / time_in_second.to_f).round(2)
  end

  def set_time_in_second
    times = readable_time.split(':').map(&:to_i)
    self.time_in_second = times[0]*3600 + times[1]*60 + times[2].to_i
  end

  def formatted_date
    self.date.to_s(:dmy)
  end

  def serialized_attrs
    EntrySerializer.new(self).attributes.deep_stringify_keys
  end
end
