class ApplicationController < ActionController::API
  include Concerns::Authenticatable

  before_action :authenticate!

  def ok_render(hash)
    render status: :ok, json: hash
  end

  def error_render(message)
    render status: :error, json: {message: message}
  end

  def only!(*roles)
    if !current_user.role.in?(roles)
      error_render('UNAUTHORIZE')
    end
  end
end
