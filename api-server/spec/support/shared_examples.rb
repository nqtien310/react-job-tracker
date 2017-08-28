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
