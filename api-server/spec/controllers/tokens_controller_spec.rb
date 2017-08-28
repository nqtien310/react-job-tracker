require 'rails_helper'

RSpec.describe TokensController, type: :controller do
  let(:password) { 'password123' }
  let(:wrong_password) { 'iamwrong' }
  let!(:user) { create(:user, password: password) }

  describe 'POST create' do
    it 'returns token if logged in successfully' do
      post(:create, params: { user: { email: user.email, password: password } })
      expect(response).to have_http_status(:ok)
      expect(json_response['token']).not_to be_nil
    end

    it 'returns error message if logged in successfully' do
      post(:create, params: { user: { email: user.email, password: wrong_password } })
      expect(response).to have_http_status(:error)

      expect(json_response['token']).to be_nil
      expect(json_response['message']).to eq 'Invalid username or password'
    end
  end
end
