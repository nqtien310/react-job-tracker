class Entry < ApplicationRecord
  validates :distance_in_metre, presence: true
  validates :time_in_second, presence: true
  validates :date, presence: true, uniqueness: true
  validates :user, presence: true

  before_save :set_speed

  belongs_to :user

  #Average speed in m/s
  def set_speed
    self.speed = (distance_in_metre / time_in_second)
  end

  def formatted_date
    self.date.to_s(:dmy)
  end

  def self.in_range(from, to)
    output = self.all
    output = output.where('date >= ?', from) if from.present?
    output = output.where('date <= ?', to)   if to.present?
    output
  end
end
