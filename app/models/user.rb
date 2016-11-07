class User < ApplicationRecord
  has_many :playlists, dependent: :destroy
  has_many :songs, :through :playlists, dependent: :destroy
end
