require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should validate_presence_of(:full_name) }
  it { should validate_confirmation_of(:password) }
  it { should have_secure_password }
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

  context 'when role is left blank' do
    it 'should assign default_role' do
      user = User.create(
        email:'tien@gmail.com',
        full_name: 'tien',
        password: 'secure123',
        password_confirmation: 'secure123'
      )

      expect(user.reload.role).to eq User::DEFAULT_ROLE
    end
  end

  context 'password validation' do
    context 'create' do
      shared_examples 'raise error' do
        it 'should raise the following error' do
          expect {
            User.create!(email: email,
                         full_name: fn,
                         password: password,
                         password_confirmation: confirmation)
          }.to raise_error(ActiveRecord::RecordInvalid, message)
        end
      end

      let(:email) { 'user@gmail.com' }
      let(:fn)    { 'user_gmail.com' }
      let(:password) { nil }
      let(:confirmation) { nil }

      context 'password does not present' do
        let(:message) { "Validation failed: Password can't be blank" }
        it_behaves_like 'raise error'
      end

      context 'validates password length' do
        let(:password) { '1234' }
        let(:message) { "Validation failed: Password is too short (minimum is 8 characters), Password confirmation can't be blank" }
        it_behaves_like 'raise error'
      end

      context 'validates password_confirmation presence' do
        let(:password) { '12345678' }
        let(:message) { "Validation failed: Password confirmation can't be blank" }
        it_behaves_like 'raise error'
      end

      context 'validates password_confirmation matched' do
        let(:password) { '12345678' }
        let(:confirmation) { '1234567' }
        let(:message) { "Validation failed: Password confirmation doesn't match Password" }
        it_behaves_like 'raise error'
      end

      context 'valid' do
        let(:password) { '12345678' }
        let(:confirmation) { '12345678' }

        it 'creates User successfully' do
          expect {
            User.create!(email: email,
                         full_name: fn,
                         password: password,
                         password_confirmation: confirmation)
          }.not_to raise_error
        end
      end
    end

    context 'update' do
      let!(:user) { create(:user) }

      shared_examples 'raise error' do
        it 'should raise the following error' do
          expect {
            user.assign_attributes(email: 'newemail@gmail.com',
                                   password: password,
                                   password_confirmation: confirmation)
            user.save!
          }.to raise_error(ActiveRecord::RecordInvalid, message)
        end
      end

      let(:password) { nil }
      let(:confirmation ) { nil }

      context 'password does not present' do
        it 'updates successfully' do
          expect {
            user.assign_attributes(email: 'newemail@gmail.com')
            user.save!
          }.not_to raise_error
        end
      end

      context 'validates password length' do
        let(:password) { '1234' }
        let(:message) { "Validation failed: Password is too short (minimum is 8 characters), Password confirmation can't be blank"}
        it_behaves_like 'raise error'
      end

      context 'validates password_confirmation presence' do
        let(:password) { '12345678' }
        let(:message) { "Validation failed: Password confirmation can't be blank"}
        it_behaves_like 'raise error'
      end

      context 'validates password_confirmation matched' do
        let(:password) { '12345678' }
        let(:confirmation) { '1234' }
        let(:message) { "Validation failed: Password confirmation doesn't match Password"}
        it_behaves_like 'raise error'
      end

      context 'password & confirm matches' do
        let(:password) { '123456789' }
        let(:confirmation) { '123456789' }

        it 'updates successfully' do
          expect {
            user.assign_attributes(email: 'newemail@gmail.com',
                                  password: password,
                                  password_confirmation: confirmation)
            user.save!
          }.not_to raise_error
          expect(user.authenticate(password)).not_to be_nil
        end
      end
    end
  end
end
