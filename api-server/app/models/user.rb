class User < ApplicationRecord
  ROLES = [
    ROLE_USER    = 'user',
    ROLE_MANAGER = 'manager',
    ROLE_ADMIN   = 'admin'
  ]

  DEFAULT_ROLE = ROLE_USER

  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
  has_secure_password
  scope :regular, Proc.new { where(role: ROLE_USER) }
  before_validation :assign_default_role!, if: :role_omitted?

  has_many :entries, dependent: :destroy

  def weekly_summaries
    return [] if entries.empty?

    entries = self.entries.order('date ASC')
    start_date = entries.first.date.beginning_of_week
    end_date   = entries.last.date.end_of_week

    output = []

    while(start_date < end_date)
      start_of_week = start_date
      end_of_week = start_date.end_of_week
      grouped_entries = entries.select do |entry|
        entry.date >= start_of_week && entry.date <= end_of_week
      end

      output << WeeklySummary.new(
        grouped_entries, start_of_week, end_of_week) if grouped_entries.present?

      start_date = start_date.next_week
    end
    output
  end

  private

  def role_omitted?
    role.nil?
  end

  def assign_default_role!
    self.role = DEFAULT_ROLE
  end
end
