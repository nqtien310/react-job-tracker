require 'rails_helper'

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
