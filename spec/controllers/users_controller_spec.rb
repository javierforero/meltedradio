require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  it "GET index returns success" do
    get :index
    expect(response).to have_http_status(:success)
  end

  describe "POST create user" do

      it "creates a new user successfully" do
        post :create, user: {name: "james"}
        expect(response).to have_http_status(201)
      end
  end

end
