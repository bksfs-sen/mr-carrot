class Api::V1::ContactsController < ApiController
    skip_before_action :authorize_request

    def create
        user_msg = contact_params[:message].to_s
        raise ExceptionHandler::InvalidParameters.new(error: "invalid_message") unless user_msg.length > 10
        @name = contact_params[:name].to_s
        @email = contact_params[:email].to_s
        UserMailer.contact_us_email(@name, @email).deliver!
    end

    private
    def contact_params
        params.require(:contact).permit(:name, :email, :message)
    end
end
