require 'rails_helper'

RSpec.shared_examples 'request and respond properly to an authenticated endpoint' do
  context 'unauthenticated' do
    it 'should be rejected' do
      pp = params rescue {}
      send(method, path, pp)
      expect(json_response['message']).to eq 'UNAUTHENTICATE'
    end
  end

  context 'authenticated' do
    it 'should receive data' do
      request.headers.merge!({'Authorization': token})
      pp = params rescue {}
      send(method, path, pp)
      expect(json_response).to eq expected
    end
  end
end

RSpec.describe My::UserController, type: :controller do
  let!(:user) { create(:user) }
  let(:token) { Tokenizer.encode(user_id: user.id) }

  describe 'GET show' do
    let(:expected) do
      user.attributes.slice('id','email','full_name','role')
    end
    let(:method) { :get }
    let(:path) { :show }

    it_behaves_like 'request and respond properly to an authenticated endpoint'
  end
end
