class RegistrationsController < Devise::RegistrationsController

  private

  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

end
