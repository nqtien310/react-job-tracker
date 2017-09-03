require 'rails_helper'

RSpec.describe RegisterController, type: :controller do
  describe 'POST create' do
    context 'invalid params' do
      let(:expected_message) { "Email can't be blank" }
      let(:params) { { user: attributes_for(:user, email: nil) } }

      it 'returns error message' do
        post(:create, params: params)
        expect(response).to have_http_status(:error)
        expect(json_response['message']).to eq expected_message
      end
    end

    context 'valid params' do
      let(:expected_message) do
        "Register user with #{params[:user][:email]} successfully"
      end
      let(:params) { { user: attributes_for(:user) } }

      it 'returns creates user if params is valid' do
        post(:create, params: params)
        expect(response).to have_http_status(:ok)
        expect(json_response['message']).to eq expected_message
      end
    end
  end
end
