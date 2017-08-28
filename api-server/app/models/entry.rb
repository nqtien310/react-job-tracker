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
end
