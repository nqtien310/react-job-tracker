require 'rails_helper'

RSpec.describe TokensController, type: :controller do
  let!(:user) { create(:user, password: 'iamright', password_confirmation: 'iamright') }

  describe 'POST create' do
    before do
      post(:create, params: { user: { email: user.email, password: password } })
    end

    context 'successfully' do
      let(:password) { 'iamright' }

      it 'returns token' do
        expect(response).to have_http_status(:ok)
        expect(json_response['token']).not_to be_nil
      end
    end

    context 'failed' do
      let(:password) { 'iamwrong' }

      it 'returns error message' do
        expect(response).to have_http_status(:error)
        expect(json_response['message']).to eq 'Invalid username or password'
      end
    end
  end
end
