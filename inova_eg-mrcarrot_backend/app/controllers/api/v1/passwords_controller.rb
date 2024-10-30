class Api::V1::PasswordsController < ApiController
    skip_before_action :authorize_request

    def update_password
        begin
            token = request.headers['firebase-token'].to_s
            @phone_number, message = FirebaseAuthentication.new.authenticate_firebase_token(token: token)
            raise ExceptionHandler::InvalidToken unless @phone_number.present?
            @user = User.find_by(mobile_number: @phone_number)
            raise ExceptionHandler::InvalidUserData unless @user.present?
            @user.update(password: params[:password])
        rescue ExceptionHandler::InvalidToken
            return json_response({message: I18n.t('invalid_token')}, :unprocessable_entity)
        rescue ExceptionHandler::InvalidUserData
            return json_response({message: I18n.t('invalid_user_data')}, :unprocessable_entity)
        end
    end

    def check_if_phone_exists
        begin
            @user = User.find_by(mobile_number: params[:phone_number])
            raise ExceptionHandler::AccountNotFound unless @user.present?
            return json_response({message: I18n.t('success')}, status: :ok)
        rescue ExceptionHandler::AccountNotFound
            return json_response({message: I18n.t('account_not_found')}, :unprocessable_entity)
        end
    end
=begin
    def forgot_password_send_otp
        user = User.find_by(mobile_number: params[:mobile_number])
        user.reset_password_token = user.generate_otp()
        #Integrate with third party
        user.reset_password_sent_at = Time.now
        user.save!
        return render json: user.reset_password_token
    end

    def check_verification
        begin
            ActiveRecord::Base.transaction do
                user = User.find_by(mobile_number: params[:mobile_number])
                raise ExceptionHandler::AccountNotFound unless user
                raise ExceptionHandler::ExpiredConfirmationToken unless Time.now.to_datetime < (user&.reset_password_sent_at + 120.seconds).to_datetime
                raise ExceptionHandler::WrongConfirmationToken unless request.headers['Reset-Code'] == user.reset_password_token
                token = build_token(user)
                return render json: token
            end
        rescue ExceptionHandler::AccountNotFound
            return json_response({message: I18n.t('account_not_found')}, :unprocessable_entity)
        rescue ExceptionHandler::ExpiredConfirmationToken
            return json_response({message: I18n.t('expired_token')}, :unprocessable_entity)
        rescue ExceptionHandler::WrongConfirmationToken
            return json_response({message: I18n.t('wrong_token')}, :unprocessable_entity)
        end
    end

    def update_password
        begin
            ActiveRecord::Base.transaction do
                decoded_token = JsonWebToken.decode(params[:verification_code])
                user = get_auth_user(decoded_token)
                if (decoded_token[:reset_password_token] == user.reset_password_token)
                    raise ExceptionHandler::UserSaveError unless user.update(is_verified: true, password: params[:password].to_s)
                else
                    raise ExceptionHandler::WrongConfirmationToken
                end
            end
        rescue ExceptionHandler::UserSaveError
            return json_response({message: I18n.t('record_not_saved')}, :unprocessable_entity)
        rescue ExceptionHandler::WrongConfirmationToken
            return json_response({message: I18n.t('wrong_token')}, :unprocessable_entity)
        end
    end

    private
    def build_token(user)
        payload = {}
        payload[:reset_password_token] = user.reset_password_token
        payload[:reset_password_sent_at] = user.reset_password_sent_at
        payload[:mobile_number] = user.mobile_number
        payload[:email] = user.email
        token = {}
        token[:jwt] = JsonWebToken.encode(payload)
        return token
    end

    def get_auth_user(decoded_token)
        user = User.find_by(mobile_number: decoded_token[:mobile_number])
        return user
    end
=end    
end