require 'rails_helper'

RSpec.describe Entry, type: :model do
  it { should validate_presence_of :distance_in_metre }
  it { should validate_presence_of :time_in_second }
  it { should validate_presence_of :date }
  it { should validate_presence_of :user }
  it { should belong_to :user}

  describe 'before_save' do
    it 'should set_speed' do
      entry = create(:entry, time_in_second: 3600, distance_in_metre: 18000)
      expect(entry.speed).to eq 5
    end
  end
end
