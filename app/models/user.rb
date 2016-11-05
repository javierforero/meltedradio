class User < ApplicationRecord
  has_many :playlists, dependent: destroy
  has_many :songs, dependent: destroy
end
