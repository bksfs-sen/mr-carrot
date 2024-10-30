class Api::V1::SessionsController < ApiController
    before_action :login_validate_phone_number, only: [:create]
    skip_before_action :authorize_request, only: [:create]

    def create
        begin
            ActiveRecord::Base.transaction do
                @user = AuthenticateUser.new(@phone_lib.to_s, auth_params[:password]).user
                return json_response(user: Api::V1::UserSerializer.new(@user, { params: {token: true, show_details: true} }).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue ExceptionHandler::AccountNotFound
            return json_response({message: I18n.t('account_not_found')}, :unprocessable_entity)
        rescue ExceptionHandler::AuthenticationError
            return json_response({message: I18n.t('invalid_credentials')}, :unprocessable_entity)            
        end
    end

    def destroy
        unless params[:force_logout].to_i.present?
            @current_user.devices.update_all(logged_out: true)
            @current_user.update(notifications_enabled: false)
        else
            @current_user_device.logged_out = true
            @current_user_device.save
        end
        return json_response({message: I18n.t('logged_out')}, :ok)
    end

    private
    def auth_params
        params.require(:user).permit(:mobile_number, :password)
    end

    def login_validate_phone_number
        if params[:user][:mobile_number].present?
            country_code = params[:user][:mobile_number].to_s[0..3]
            phone = params[:user][:mobile_number].to_s[4..]
            phone_obj = PhoneFormatter::format_phone(phone, country_code)
            return json_response({message: I18n.t("phone_invalid")}, :unprocessable_entity) unless phone_obj
            @phone_lib = Phonelib.parse("#{phone_obj[:country_code]}#{phone_obj[:phone]}")
            return json_response({message: I18n.t("phone_invalid")}, :unprocessable_entity) unless @phone_lib.valid?
        end
    end
end