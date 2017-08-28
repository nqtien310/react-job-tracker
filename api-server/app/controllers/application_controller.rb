class ApplicationController < ActionController::API
  def ok_render(hash)
    render status: :ok, json: hash
  end

  def error_render(message)
    render status: :error, json: {message: message}
  end
end
