require 'rails_helper'

describe User::WeeklySummariesController do
  let(:token) { Tokenizer.encode(user_id: user.id) }
  before do
    request.headers.merge!({'Authorization': token})
  end
  let!(:resource_user) { create(:user) }
  let!(:entry1) { create(:entry, user: resource_user, date: '2017-01-01') }
  let!(:entry2) { create(:entry, user: resource_user, date: '2017-01-02') }
  let!(:entry3) { create(:entry, user: resource_user, date: '2017-01-03') }

  describe 'GET index' do
    let(:method) { :get }
    let(:path) { :index }
    let(:valid_params) { {user_id: resource_user.id} }
    let(:invalid_params) { {user_id: 9090} }
    let(:expected_error) { 'user 9090 not found' }
    let(:expected_success) do
      [{"start_date"=>"2016-12-26", "end_date"=>"2017-01-01", "distance_in_metre"=>18000, "speed"=>5.0, "formatted_distance"=>"18.0 km", "formatted_speed"=>"18.0 km/h"},
       {"start_date"=>"2017-01-02", "end_date"=>"2017-01-08", "distance_in_metre"=>36000, "speed"=>5.0, "formatted_distance"=>"36.0 km", "formatted_speed"=>"18.0 km/h"}]
    end
    it_behaves_like 'only accessible by Admin'
  end
end
