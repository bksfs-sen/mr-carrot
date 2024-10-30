class Api::V1::UsersController < ApiController
    before_action :validate_phone_number, only: [:create, :update]
    skip_before_action :authorize_request, only: [:create]

    def create
        begin
            ActiveRecord::Base.transaction do
                @user = User.new(user_params.merge(unconfirmed_mobile_number: @phone_lib))
                device = Device.create(device_params)
                @user.devices << device
                raise ExceptionHandler::ArgumentError unless user_params[:password] == user_params[:password_confirmation]
                raise ExceptionHandler::UserSaveError unless @user.save
                send_confirmation_token(@user)
                return json_response(user: Api::V1::UserSerializer.new(@user, { params: {token: true, show_details: true} }).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue ExceptionHandler::ArgumentError
            return json_response({message: "Password mismatch"}, :unprocessable_entity)
        rescue ExceptionHandler::UserSaveError
            return json_response({message: @user.errors.full_messages}, :unprocessable_entity)
        end
    end

    def show
        begin
            raise ExceptionHandler::InvalidToken unless @current_user.present?
            return json_response(user: Api::V1::UserSerializer.new(@current_user, { params: {token: false, show_profile_data: true} }).serializable_hash[:data][:attributes], status: :ok)
        rescue ExceptionHandler::InvalidToken
            return json_response({message: "Invalid token"}, :unprocessable_entity)
        end
    end
    def update
            if params[:user][:full_name].present?
                names = params[:user][:full_name].split(' ', 2)
                @first_name = names[0]
                @last_name = names[1] if names.size > 1
            end
            if params[:user][:unconfirmed_mobile_number] && (@current_user.mobile_number != params[:user][:unconfirmed_mobile_number])
                send_confirmation_token(@current_user)
            end
            @current_user.update!(unconfirmed_mobile_number: @phone_lib, first_name: @first_name, last_name: @last_name, email: params[:user][:email] )
            return json_response(user: Api::V1::UserSerializer.new(@user, { params: {token: true, show_details: true} }).serializable_hash[:data][:attributes], status: :ok)
    end

    def send_confirmation_token(user)
        user.confirmation_token = user.generate_otp()
        # Integrate with third party
        user.confirmation_sent_at = Time.now
        user.save!
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :unconfirmed_mobile_number, :password, :password_confirmation)
    end


    def device_params
        params.require(:device).permit(:uuid, :fcm_token)
    end

    def validate_phone_number
       if params[:user][:unconfirmed_mobile_number].present?
        country_code = params[:user][:unconfirmed_mobile_number].to_s[0..3]
        phone = params[:user][:unconfirmed_mobile_number].to_s[4..]
        phone_obj = PhoneFormatter::format_phone(phone, country_code)
        return json_response({message: I18n.t("phone_invalid")}, :unprocessable_entity) unless phone_obj
        @phone_lib = Phonelib.parse("#{phone_obj[:country_code]}#{phone_obj[:phone]}")
        return json_response({message: I18n.t("phone_invalid")}, :unprocessable_entity) unless @phone_lib.valid?
       end
    end
end
