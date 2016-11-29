class PlaylistsController < ApplicationController

  def index
    playlists = Playlist.all
    render json: playlist, status: 200
  end

  def create
    playlist = Playlist.new(playlist_params)

    if playlist.save

      render json: playlist, status: 200
    else
      render json: {error: "wrong/missing inputs, playlist not created", status: 422}, status: 422
    end
  end

  def show
    playlist = Playlist.find(params[:id])
    render json: playlist, status: 200

  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :user_id)
  end

end
