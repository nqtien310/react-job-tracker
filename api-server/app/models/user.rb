class User < ApplicationRecord
  ROLES = [
    ROLE_USER    = 'user',
    ROLE_MANAGER = 'manager',
    ROLE_ADMIN   = 'admin'
  ]

  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
  validates :role, presence: true, inclusion: {in:  ROLES}
  has_secure_password

  has_many :entries
end
