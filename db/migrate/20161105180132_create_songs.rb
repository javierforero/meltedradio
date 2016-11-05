class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :url
      t.references :playlist, foreign_key: true
      t.integer :user_id

      t.timestamps
    end
  end
end
