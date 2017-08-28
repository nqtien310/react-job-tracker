class CurrentUserController < ApplicationController
  def show
    render status: :ok, json: current_user
  end
end
