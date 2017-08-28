require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:email) { 'nqtien310@gmail.com' }

  describe 'POST create' do
    context 'invalid params' do
      let(:expected_message) do
        ["Full name can't be blank",
        "Role can't be blank",
        "Role is not included in the list",
        "Password can't be blank"]
      end

      let(:params) do
        {user: {email: email}}
      end

      it 'returns error message' do
        post(:create, params: params)
        expect(response).to have_http_status(:error)
        expect(json_response['message']).to eq expected_message
      end
    end


    context 'valid params' do
      let(:params) do
        { user: {
          email: email,
          password: 'valid123',
          password_confirmation: 'valid123',
          role: User::ROLE_USER,
          full_name: 'Tien Nguyen'
        }}
      end

      let(:expected_message) do
        "Create user with #{email} successfully"
      end

      it 'returns creates user if params is valid' do
        post(:create, params: params)
        expect(response).to have_http_status(:ok)
        expect(json_response['message']).to eq expected_message
      end
    end
  end
end
