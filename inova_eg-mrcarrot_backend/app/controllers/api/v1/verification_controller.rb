class Api::V1::VerificationController < ApiController

    skip_before_action :authorize_request, only: [:verify, :verify_with_firebase]

    def verify
        begin
            ActiveRecord::Base.transaction do
                @user = User.find_by(unconfirmed_mobile_number: params[:unconfirmed_mobile_number])
                raise ExceptionHandler::AccountNotFound unless @user
                raise ExceptionHandler::ExpiredConfirmationToken unless DateTime.now.utc.to_datetime < (@user.confirmation_sent_at + 120.seconds).utc.to_datetime
                raise ExceptionHandler::WrongConfirmationToken unless request.headers['Confirmation-Code'] == @user.confirmation_token
                @user.mobile_number = params[:unconfirmed_mobile_number]
                @user.is_verified = true
                @user.unconfirmed_mobile_number = ""
                raise ExceptionHandler::UserSaveError unless @user.save!
                return json_response(user: Api::V1::UserSerializer.new(@user).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue ExceptionHandler::AccountNotFound
            return json_response({message: I18n.t('account_not_found')}, :unprocessable_entity)
        rescue ExceptionHandler::ExpiredConfirmationToken
            return json_response({message: I18n.t('expired_token')}, :unprocessable_entity)
        rescue ExceptionHandler::WrongConfirmationToken
            return json_response({message: I18n.t('wrong_token')}, :unprocessable_entity)
        rescue ExceptionHandler::UserSaveError
            return json_response({message: @user.errors.full_messages}, :unprocessable_entity)
        end
    end

    def verify_with_firebase
        begin
            token = request.headers['firebase-token'].to_s
            @phone_number, message = FirebaseAuthentication.new.authenticate_firebase_token(token: token)
            raise ExceptionHandler::InvalidToken unless @phone_number.present?
            @user = User.find_by(unconfirmed_mobile_number: @phone_number)
            raise ExceptionHandler::InvalidUserData unless @user.present?
            @user.update(unconfirmed_mobile_number: nil)
            @user.update(is_verified: true, mobile_number: @phone_number)
        rescue ExceptionHandler::InvalidToken
            return json_response({message: I18n.t('invalid_token')}, :unprocessable_entity)
        rescue ExceptionHandler::InvalidUserData
            return json_response({message: I18n.t('invalid_user_data')}, :unprocessable_entity)
        end
    end

    def resend_confirmation_token
                # Integrate with third party
            @current_user.update!(confirmation_sent_at: DateTime.now, confirmation_token: @current_user.generate_otp())
        return response_json(data: { user: @current_user.reload.as_json(options: detailed_view(is_owner: true))})
    end

end
