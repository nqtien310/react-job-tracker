require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should validate_presence_of(:full_name) }
  it { should validate_confirmation_of(:password) }
  it { should have_secure_password }
  it { should validate_presence_of(:role) }
  it { should validate_inclusion_of(:role).in_array(['user', 'manager', 'admin']) }
  it { should have_many :entries }

  describe '#weekly_summaries' do
    let!(:user) { create(:user) }

    context 'with data' do
      let!(:entry1) { create(:entry, user: user, date: '2017-01-01') }
      let!(:entry2) { create(:entry, user: user, date: '2017-01-02') }

      let!(:entry3) { create(:entry, user: user, date: '2017-01-03') }

      let!(:entry4) { create(:entry, user: user, date: '2017-01-10') }

      let!(:entry5) { create(:entry, user: user, date: '2017-01-11') }

      let!(:entry6) { create(:entry, user: user, date: '2017-02-20') }

      it 'should return grouped entries by week' do
        weekly_summary = user.weekly_summaries[0]
        expect(weekly_summary.start_date).to eq Date.parse('2016-12-26')
        expect(weekly_summary.end_date).to eq Date.parse('2017-01-01')
        expect(weekly_summary.entries).to match_array [entry1]
        expect(weekly_summary.distance_in_metre).to eq 18000
        expect(weekly_summary.speed).to eq 5.0

        weekly_summary = user.weekly_summaries[1]
        expect(weekly_summary.start_date).to eq Date.parse('2017-01-02')
        expect(weekly_summary.end_date).to eq Date.parse('2017-01-08')
        expect(weekly_summary.entries).to match_array [entry2, entry3]
        expect(weekly_summary.distance_in_metre).to eq 36000
        expect(weekly_summary.speed).to eq 5.0


        weekly_summary = user.weekly_summaries[2]
        expect(weekly_summary.start_date).to eq Date.parse('2017-01-09')
        expect(weekly_summary.end_date).to eq Date.parse('2017-01-15')
        expect(weekly_summary.entries).to match_array [entry4, entry5]
        expect(weekly_summary.distance_in_metre).to eq 36000
        expect(weekly_summary.speed).to eq 5.0

        weekly_summary = user.weekly_summaries[3]
        expect(weekly_summary.start_date).to eq Date.parse('2017-02-20')
        expect(weekly_summary.end_date).to eq Date.parse('2017-02-26')
        expect(weekly_summary.entries).to match_array [entry6]
        expect(weekly_summary.distance_in_metre).to eq 18000
        expect(weekly_summary.speed).to eq 5.0
      end
    end

    context 'without data' do
      it 'returns nil' do
        expect(user.weekly_summaries).to be_empty
      end
    end
  end
end
