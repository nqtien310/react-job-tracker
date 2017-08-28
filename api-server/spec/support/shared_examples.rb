RSpec.shared_examples 'request and respond properly to an authenticated endpoint' do
  context 'unauthenticated' do
    let(:pp) { params rescue {} }
    before do
      send(method, path, pp)
    end

    it 'should be rejected' do
      expect(json_response['message']).to eq 'UNAUTHENTICATE'
    end

    it 'should return error status' do
      expect(response).to have_http_status(:error)
    end
  end

  context 'authenticated' do
    let(:pp) { params rescue {} }
    before do
      request.headers.merge!({'Authorization': token})
      send(method, path, pp)
    end

    it 'should receive data' do
      expect(json_response).to eq expected
    end

    it 'should return ok status' do
      expect(response).to have_http_status(:ok)
    end
  end
end

RSpec.shared_examples 'accessible' do
  context 'invalid params' do
    it 'returns error status & message' do
      send(method,path,params: invalid_params)

      expect(response).to have_http_status(:error)
      expect(json_response['message']).to eq expected_error
    end
  end

  context 'valid params' do
    it 'returns success status & message' do
      send(method,path,params: valid_params)

      expect(response).to have_http_status(:ok)
      expect(json_response['message']).to eq expected_success
    end
  end
end

RSpec.shared_examples 'inaccessible' do
  it 'is not authorized' do
    send(method, path, params: valid_params)
    expect(response).to have_http_status(:error)
    expect(json_response['message']).to eq 'UNAUTHORIZE'
  end
end

RSpec.shared_examples 'only accessible by Manager & Admin' do
  context 'Admin' do
    let(:user) { create(:admin) }
    it_behaves_like 'accessible'
  end

  context 'Manager' do
    let(:user) { create(:manager) }
    it_behaves_like 'accessible'
  end

  context 'User' do
    let(:user) { create(:user) }
    it_behaves_like 'inaccessible'
  end
end
