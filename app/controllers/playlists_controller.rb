class PlaylistsController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(params[:user_id])
    playlists = user.playlists
    render :json => playlists, :include => {:user => {:only => :name}}, status: 200
  end

  def create
    user = User.find(params[:user_id])
    playlist = user.playlists.new(playlist_params)

    if playlist.save

      render :json => user.playlists, :include => {:user => {:only => :name}}, status: 200
    else
      render json: {error: "wrong/missing inputs, playlist not created", status: 422}, status: 422
    end
  end

  def show
    user = User.find(params[:user_id])
    playlist = user.playlists.find(params[:id])
    render json: playlist, status: 200

  end

  def update
    user = User.find(params[:user_id])
    playlist = user.playlists.find(params[:id])

    if playlist.update_attributes(playlist_params)
      render json: playlist, status: 200
    else
      render json: {error: "Playlist failed to update", status: 400}, status: 400
    end
  end

  def destroy

    user = User.find(params[:user_id])
    playlist = user.playlists.find(params[:id])

    if playlist.destroy
      render json: {message: "#{playlist.title} was deleted", user_playlists: user.playlists, status: 200}, status: 200
    else
      render json: {error: "playlist failed to delete", status: 400}, status: 400
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :public)
  end

end
