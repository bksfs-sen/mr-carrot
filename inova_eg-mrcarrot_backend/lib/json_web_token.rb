class JsonWebToken
    SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
  
    def self.encode(payload, expire = false)
      exp = Time.now.to_i + 1.month
      payload[:exp] = exp if expire
      JWT.encode(payload, SECRET_KEY, "HS256")
    end
  
    def self.decode(token)
      decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: "HS256" })[0]
      HashWithIndifferentAccess.new decoded
      rescue JWT::VerificationError
        raise(
          ExceptionHandler::InvalidToken,
          ("#{I18n.t('invalid_token')}")
        )
      rescue JWT::DecodeError
        raise(
          ExceptionHandler::InvalidToken,
          ("#{I18n.t('invalid_token')}")
        )
    end
end