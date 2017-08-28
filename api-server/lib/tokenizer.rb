class Tokenizer
  class << self
    def encode(hash)
      JWT.encode(hash, secret, 'HS256')
    end

    def decode(token)
      return nil unless token
      body = JWT.decode(token, secret)[0]
      HashWithIndifferentAccess.new body
    end

    def secret
      Rails.application.secrets[:secret_key_base]
    end
  end
end
