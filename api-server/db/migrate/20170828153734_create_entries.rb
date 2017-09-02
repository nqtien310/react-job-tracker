class CreateEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :entries do |t|
      t.date :date
      t.float :distance_in_metre
      t.integer :time_in_second
      t.float :speed
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
