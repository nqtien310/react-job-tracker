class User::WeeklySummariesController < ApplicationController
  before_action :authorize!
  prepend_before_action :load_and_validate_user!

  def index
    ok_render(@user.weekly_summaries)
  end

  private

  def load_and_validate_user!
    @user = User.find_by_id(params[:user_id])
    if @user.nil?
      error_render("user #{params[:user_id]} not found")
    end
  end

  def authorize!
    only!(User::ROLE_ADMIN)
  end
end
