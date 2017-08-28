require 'rails_helper'
describe User::EntriesController do
  let(:token) { Tokenizer.encode(user_id: user.id) }
  before do
    request.headers.merge!({'Authorization': token})
  end

  let!(:entry) { create(:entry, user: resource_user) }
  let(:resource_user) { create(:user) }

  describe 'GET index' do
    let(:method) { :get }
    let(:path) { :index }
    let(:valid_params) { {user_id: resource_user.id} }
    let(:invalid_params) { {user_id: 9090} }
    let(:expected_error) { 'user 9090 not found' }
    let(:expected_success) do
      [entry.slice('id', 'time_in_second', 'distance_in_metre', 'formatted_date', 'speed')]
    end
    it_behaves_like 'only accessible by Admin'
  end

  describe 'POST create' do
    let(:method) { :post }
    let(:path) { :create }
    let(:valid_params) do
      {entry: {distance_in_metre: 37000,
               time_in_second: 1000,
               date: 1.day.ago,
      }, user_id: resource_user.id}
    end
    let(:invalid_params) do
      {user_id: resource_user.id,
       entry: {distance_in_metre: 37000, time_in_second: 1000}
      }
    end
    let(:expected_error) { ["Date can't be blank"] }
    let(:expected_success) {{"message"=>"Create entry successfully"}}
    it_behaves_like 'only accessible by Admin'

    context 'Admin' do
      let(:user) { create(:admin) }

      it 'updates entry' do
        expect {
          send(method, path, {params: valid_params})
        }.to change(resource_user.entries, :count).by(1)
      end
    end
  end

  describe 'PUT update' do
    let(:method) { :put }
    let(:path) { :update }
    let(:valid_params) do
      {entry: {distance_in_metre: 37000}, user_id: resource_user.id, id: entry.id}
    end
    let(:invalid_params) { {user_id: 9090, id: entry.id} }
    let(:expected_error) { 'user 9090 not found' }
    let(:expected_success) do
      {"message"=>"Update entry #{entry.id} successfully"}
    end
    it_behaves_like 'only accessible by Admin'

    context 'Admin' do
      let(:user) { create(:admin) }

      it 'updates entry' do
        send(method, path, {params: valid_params})
        expect(entry.reload.distance_in_metre).to eq 37000
      end
    end
  end

  describe 'DELETE destroy' do
    let(:method) { :delete }
    let(:path) { :destroy }
    let(:valid_params) { {user_id: resource_user.id, id: entry.id} }
    let(:invalid_params) { {user_id: 9090, id: entry.id} }
    let(:expected_error) { 'user 9090 not found' }
    let(:expected_success) do
      {"message"=>"Deleted entry #{entry.id}"}
    end
    it_behaves_like 'only accessible by Admin'

    context 'Admin' do
      let(:user) { create(:admin) }

      it 'deletes entry' do
        expect {
          send(method, path, {params: valid_params})
        }.to change(resource_user.entries,:count).by(-1)
        expect {entry.reload}.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
