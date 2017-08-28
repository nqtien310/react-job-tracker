require 'rails_helper'

describe My::EntriesController do
  let!(:user) { create(:user) }
  let(:token) { Tokenizer.encode(user_id: user.id) }

  describe 'GET index' do
    let!(:entry)   { create(:entry, user: user) }
    let(:method) { :get }
    let(:path)   { :index }
    let(:params) { {} }
    let(:expected) do
      [entry.slice('id', 'time_in_second', 'distance_in_metre', 'formatted_date', 'speed')]
    end

    it_behaves_like 'authenticable endpoint'
  end

  describe 'POST create' do
    let(:method) { :post }
    let(:path)   { :create }
    let(:params) { {entry: attributes_for(:entry)} }
    let(:expected) { {'message' => 'Create entry successfully' }}

    it_behaves_like 'authenticable endpoint'

    it 'creats new entry' do
      expect {
        request.headers.merge!({'Authorization': token})
        send(method, path, {params: params})
      }.to change(user.entries, :count)
    end
  end

  describe 'UPDATE create' do
    let!(:entry)   { create(:entry, user: user) }
    let(:method) { :put }
    let(:path)   { :update }
    let(:params) do
      {
        id: entry.id,
        entry: attributes_for(:entry, distance_in_metre: 1000, time_in_second: 100)
      }
    end
    let(:expected) { {'message' => "Update entry #{entry.id} successfully" }}

    it_behaves_like 'authenticable endpoint'

    it 'updates entry' do
      request.headers.merge!({'Authorization': token})
      send(method, path, {params: params})
      expect(entry.reload.distance_in_metre).to eq 1000
      expect(entry.time_in_second).to eq 100
      expect(entry.speed).to eq 10
    end
  end

  describe 'DELETE destroy' do
    let!(:entry)   { create(:entry, user: user) }
    let(:method) { :delete }
    let(:path)   { :destroy }
    let(:params) do
      {
        id: entry.id,
      }
    end
    let(:expected) { {'message' => "Deleted entry #{entry.id}" }}

    it_behaves_like 'authenticable endpoint'

    it 'updates entry' do
      expect {
        request.headers.merge!({'Authorization': token})
        send(method, path, {params: params})
      }.to change(user.entries, :count).by(-1)

      expect { entry.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
