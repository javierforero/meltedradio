class AddPublicToPlaylists < ActiveRecord::Migration[5.0]
  def change
    add_column :playlists, :public, :boolean, default: true
  end
end
