class RestfulController < ApplicationController
  before_action :authorize!
  before_action :load_and_validate_record!, only: [:update, :destroy]

  def index
    ok_render(collection)
  end

  def create
    record = collection.new(permitted_params)

    if(record.valid?)
      record.save
      ok_render(message: "Create #{model_name} successfully")
    else
      error_render(record.errors.full_messages)
    end
  end

  def update
    if(@record.update_attributes(permitted_params))
      ok_render(message: "Update #{model_name} #{@record.id} successfully")
    else
      error_render(@record.errors.full_messages)
    end
  end

  def destroy
    if(@record.destroy)
      ok_render(message: "Deleted #{model_name} #{@record.id}")
    else
      error_render(@record.errors.full_messages)
    end
  end

  private

  def collection
    raise 'Inherit RestfulController has to implement #collection'
  end

  def load_and_validate_record!
    @record = collection.find_by_id(params[:id])
    if @record.nil?
      error_render("#{model_name} #{params[:id]} not found")
    end
  end
end
