require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:params) { { user: attributes_for(:user) } }

  describe 'POST create' do
    context 'invalid params' do
      let(:expected_message) { ["Full name can't be blank"] }
      let(:invalid_params) do
        params.tap {|params| params[:user].delete(:full_name)}
      end

      it 'returns error message' do
        post(:create, params: invalid_params)
        expect(response).to have_http_status(:error)
        expect(json_response['message']).to eq expected_message
      end
    end


    context 'valid params' do
      let(:expected_message) do
        "Create user with #{params[:user][:email]} successfully"
      end

      it 'returns creates user if params is valid' do
        post(:create, params: params)
        expect(response).to have_http_status(:ok)
        expect(json_response['message']).to eq expected_message
      end
    end
  end
end
