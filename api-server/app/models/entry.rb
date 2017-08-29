class Entry < ApplicationRecord
  validates :distance_in_metre, presence: true
  validates :time_in_second, presence: true
  validates :date, presence: true, uniqueness: { scope: 'user_id' }
  validates :user, presence: true

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
    self.speed = (distance_in_metre / time_in_second)
  end

  def formatted_date
    self.date.to_s(:dmy)
  end

  def serialized_attrs
    EntrySerializer.new(self).attributes.deep_stringify_keys
  end
end
