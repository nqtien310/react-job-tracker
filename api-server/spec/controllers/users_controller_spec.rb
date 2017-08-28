require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:token) { Tokenizer.encode(user_id: user.id) }
  before do
    request.headers.merge!({'Authorization': token})
  end

  render_views

  describe 'POST create' do
    let(:invalid_params) { { user: attributes_for(:user, email: nil) }}
    let(:expected_error) { ["Email can't be blank"] }
    let(:expected_success) { "Create user with #{valid_params[:user][:email]} successfully" }
    let(:valid_params)   { { user: attributes_for(:user) }}
    let(:method)         { :post }
    let(:path)           { :create }
    it_behaves_like 'only accessible by Manager & Admin'
  end

  describe 'PUT update' do
    let!(:prev_user) { create(:user) }

    let(:invalid_params) do
      { id: prev_user.id,
        user: attributes_for(:user, email: '') }
    end
    let(:expected_error) { ["Email can't be blank"] }
    let(:expected_success) { "Update user #{valid_params[:user][:email]} successfully" }
    let(:valid_params)   do
      { id: prev_user.id,
        user: attributes_for(:user, full_name: 'New Name') }
    end
    let(:method)         { :put }
    let(:path)           { :update }
    it_behaves_like 'only accessible by Manager & Admin'

    #Some specific scenarios
    context 'Admin' do
      let(:user) { create(:admin) }

      it 'update users' do
        send(method, path, params: valid_params)
        expect(prev_user.reload.full_name).to eq 'New Name'
      end
    end
  end

  describe 'DELETE destroy' do
    let!(:prev_user) { create(:user) }

    let(:invalid_params) do
      { id: 989,
        user: attributes_for(:user, email: '') }
    end
    let(:expected_error) { "User 989 not found" }
    let(:expected_success) { "Deleted user #{prev_user.email}" }
    let(:valid_params)   do
      { id: prev_user.id,
        user: attributes_for(:user, full_name: 'New Name') }
    end
    let(:method)         { :delete }
    let(:path)           { :destroy }
    it_behaves_like 'only accessible by Manager & Admin'

    #Some specific scenarios
    context 'Admin' do
      let(:user) { create(:admin) }

      it 'delete users' do
        send(method, path, params: valid_params)
        expect { prev_user.reload }.to raise_error
      end
    end
  end
end
