class AuthenticateUser
    
    def initialize(mobile_number, password)
      @mobile_number = mobile_number
      @password = password
    end
  
    # Service entry point
    def call
      {
        user: user
      }
    end
  
    def user
      user = User.where("mobile_number = ?", @mobile_number).first
      return user if user && user.valid_password?(@password)#user.authenticate(@password)
  
      raise(ExceptionHandler::AccountNotFound, I18n.t('account_not_found')) if user.nil?
      raise(ExceptionHandler::AuthenticationError, I18n.t('invalid_credentials'))
    end
  
    #private
    #attr_reader :username, :country_code, :password
  
  end