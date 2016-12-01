class SongsController < ApplicationController

  def create
    @playlist = Playlist.find(params[:playlist_id])
    song = @playlist.songs.new(song_params)
    song.user = current_user
  end

  def update
  end

  def delete
  end

  private

  def song_params
    params.require(:song).permit(:title, :artist, :url)
  end
end
