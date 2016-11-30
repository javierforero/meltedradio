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

  def update
    playlist = Playlist.find(params[:id])

    if playlist.update_attributes(playlist_params)
      render json: playlist, status: 200
    else
      render json: {error: "Playlist failed to update", status: 400}, status: 400
    end
  end

  def destroy
    playlist = Playlist.find(params[:id])

    if playlist.destroy
      render json: {message: "#{playlist.title} was deleted", status: 200}, status: 200
    else
      render json: {error: "playlist failed to delete", status: 400}, status: 400
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :user_id)
  end

end
