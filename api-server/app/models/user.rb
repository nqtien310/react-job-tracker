class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
  has_secure_password
end
