class UsersController < ApplicationController
  def index
    users = User.all

    render json: users, status: 200
  end

  def show
    user = User.find(params[:id])

    render json: user, status: 200
  end

  def create
    user = User.new(user_params)

    if user.save!
      render json: user, status: 201
    else
      render json: {error: "User is invalid"}, status: 400
    end
  end

  def update
    user = User.find(params[:id])

    if user.update_attributes(user_params)
      render json: user, status: 200
    else
      render json: {error: "User update failed", status: 400}, status: 400
    end
  end

  def destroy
    user = User.find(params[:id])

    if user.destroy
      render json: {message: "User #{user.name} with id: #{user.id} was destroyed!"}, status: 200
    else
      render json: {error: "Failed to delete user", status: 400}, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
