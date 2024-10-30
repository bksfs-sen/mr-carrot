class AuthorizeApiRequest
    def initialize(headers)
        @headers = headers
    end

    def call
        {
            user: user#,
            #device: device
        }
    end

    private

    def user
       get_decoded_authurization_token
       @user = User.find_by(id: @decoded_authurization_token[:user_id]) if get_decoded_authurization_token
    end

    def device
        @device = Device.find_by(id: @decoded_authurization_token[:device]) if get_decoded_authurization_token
    end

    def get_http_authentication_token_from_header
        return @headers['Authorization'].split(" ").last if @headers['Authorization'].present?
        # raise missing token error 
    end

    def get_decoded_authurization_token
        @decoded_authurization_token ||= JsonWebToken.decode(get_http_authentication_token_from_header)
    end
end