require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should validate_presence_of(:full_name) }
  it { should validate_confirmation_of(:password) }
  it { should have_secure_password }
  it { should validate_presence_of(:role) }
  it { should validate_inclusion_of(:role).in_array(['user', 'manager', 'admin']) }
end
