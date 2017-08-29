class My::WeeklySummariesController < ApplicationController
  def index
    ok_render(current_user.weekly_summaries)
  end
end
