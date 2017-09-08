class AddReadableTimeToEntry < ActiveRecord::Migration[5.1]
  def change
    add_column :entries, :readable_time, :string
  end
end
