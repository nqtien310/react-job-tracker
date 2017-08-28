module Concerns::Authenticatable
  def current_user
    @current_user ||= begin
      if data = Tokenizer.decode(token_from_header)
        User.find(data[:user_id])
      end
    end
  end

  def token_from_header
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    else
      nil
    end
  end

  def authenticate!
    if !current_user.present?
      error_render('UNAUTHENTICATE')
    end
  end
end
