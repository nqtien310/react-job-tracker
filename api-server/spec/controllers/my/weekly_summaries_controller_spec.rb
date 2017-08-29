require 'rails_helper'

describe My::WeeklySummariesController do
  let!(:user) { create(:user) }
  let(:token) { Tokenizer.encode(user_id: user.id) }
  let!(:entry1) { create(:entry, user: user, date: '2017-01-01') }
  let!(:entry2) { create(:entry, user: user, date: '2017-01-02') }
  let!(:entry3) { create(:entry, user: user, date: '2017-01-03') }

  describe 'GET index' do
    let(:method) { :get }
    let(:path) { :index }
    let(:params) { {} }
    let(:expected) do
      [{"start_date"=>"2016-12-26", "end_date"=>"2017-01-01", "distance_in_metre"=>18000, "speed"=>5.0},
       {"start_date"=>"2017-01-02", "end_date"=>"2017-01-08", "distance_in_metre"=>36000, "speed"=>5.0}]
    end
    it_behaves_like 'authenticable endpoint'
  end
end
