require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let!(:my_user) {User.create(name: "James")}

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

  describe "UPDATE user" do

     it "updates user attributes" do
       put :update, id: my_user.id, user: {name: "pablo"}
       expect(response).to have_http_status(200)
       expect(User.find(my_user.id).name).to eq("pablo")
     end
  end

  describe "DELETE user" do
    it "deletes especified user" do
      delete :destroy, id: my_user
      expect(response).to have_http_status(200)
      expect {my_user.reload}.to raise_exception(ActiveRecord::RecordNotFound)
    end
  end

end
