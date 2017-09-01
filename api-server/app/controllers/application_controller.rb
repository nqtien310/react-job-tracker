class ApplicationController < ActionController::API
  include Concerns::Authenticatable
  rescue_from ActionController::ParameterMissing, with: :param_missing_handler

  before_action :authenticate!

  def ok_render(hash)
    render status: :ok, json: hash
  end

  def error_render(message)
    if message.is_a?(Array)
      message = message.join('\n')
    end
    render status: :error, json: {message: message}
  end

  def only!(*roles)
    if current_user != @user && !current_user.role.in?(roles)
      error_render('UNAUTHORIZE')
    end
  end

  private

  def param_missing_handler(e)
    error_render(e.message)
  end
end
