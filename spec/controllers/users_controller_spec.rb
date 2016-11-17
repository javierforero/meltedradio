require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  it "GET index returns success" do
    get :index
    expect(response).to have_http_status(:success)
  end
end
