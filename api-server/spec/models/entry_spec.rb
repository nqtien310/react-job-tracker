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

  describe 'in_range' do
    let(:user) { create(:user) }
    let!(:entry_1) { create(:entry, date: 1.month.ago, user: user) }
    let!(:entry_2) { create(:entry, date: 1.week.ago, user: user) }
    let!(:entry_3) { create(:entry, date: 1.day.ago, user: user) }

    it 'returns correct entries within range' do
      expect(user.entries.in_range(1.month.ago, 1.month.ago+1.day)).to match_array [entry_1]
      expect(user.entries.in_range(1.month.ago, Date.today)).to match_array [entry_1,entry_2,entry_3]
      expect(user.entries.in_range(1.week.ago, Date.today)).to match_array [entry_2,entry_3]
      expect(user.entries.in_range(1.week.ago, nil)).to match_array [entry_2,entry_3]
      expect(user.entries.in_range(1.month.ago, 1.week.ago)).to match_array [entry_1,entry_2]
      expect(user.entries.in_range(nil, nil)).to match_array [entry_1,entry_2,entry_3]
      expect(Entry.in_range(nil, nil)).to match_array [entry_1,entry_2,entry_3]
    end

    it 'receives strings as params' do
      from = 1.month.ago.to_date.to_s
      to   = 1.week.ago.to_date.to_s

      expect(user.entries.in_range(from, to)).to match_array [entry_1, entry_2]
    end
  end
end
