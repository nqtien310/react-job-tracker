module Concerns::Tokenizable
  def decode_token(token)

  end

  def encode(hash)
    JWT.encode({user_id: user.id}, secret, 'HS256')
  end

end
