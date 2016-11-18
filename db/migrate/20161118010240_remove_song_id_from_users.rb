class RemoveSongIdFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :song_id, :integer
  end
end
