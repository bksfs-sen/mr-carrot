class Api::V1::PreRegisteredUsersController < ApiController
  skip_before_action :authorize_request

  def create
    ActiveRecord::Base.transaction do
      @pre_registered_user = PreRegisteredUser.new(pre_registered_user_params)
      if @pre_registered_user.save
        UserMailer.pre_registration_email(pre_registered_user_params[:name], pre_registered_user_params[:email]).deliver!
        json_response(pre_registered_user: @pre_registered_user, status: :ok)
      else
        json_response({ message: @pre_registered_user.errors.full_messages }, :unprocessable_entity)
      end
    end
  end

  private

  def pre_registered_user_params
    params.require(:pre_registered_user).permit(:first_name, :last_name, :email, :phone_number)
  end
end
