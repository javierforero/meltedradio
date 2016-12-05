class SongsController < ApplicationController

  def create
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.new(song_params)

    if song.save
      render json: song, status: 200
    else
      render json: {error: "Failed to save song", status: 400}, status: 400
    end
  end

  def update
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.find(params[:id])

    if song.update_attributes(song_params)
      render json: song, status: 200
    else
      render json: {error: "Failed to update song", status: 422}, status: 422
    end
  end

  def delete
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.find(params[:id])

    if song.destroy
      render json: {message: "The song #{song.title} was deleted", status: 200}, status: 200
    else
      render json: {error: "Failed to delete song", status: 400}, status: 400
    end
  end

  private

  def song_params
    params.require(:song).permit(:title, :artist, :url)
  end
end
