class SongsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    playlist = Playlist.find(params[:playlist_id])
    songs = playlist.songs

    render json: songs, status: 200
  end

  def create
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.new(song_params)
    song.user = current_user
    if song.save
      render json: playlist.songs, status: 200
    else
      render json: {error: "wrong/missing inputs, song not created #{song.user_id}", status: 422}, status: 422
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

  def destroy
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.find(params[:id])

    if song.destroy
      render json: {message: "The song #{current_user} was deleted", status: 200, current_playlist: playlist}, status: 200
    else
      render json: {error: "Failed to delete song", status: 400}, status: 400
    end
  end

  private

  def song_params
    params.require(:song).permit(:title, :artist, :url)
  end
end
