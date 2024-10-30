class FirebaseAuthentication
  include HTTParty
  

  def authenticate_firebase_token(token: '')
    api_key = Rails.application.credentials.dig(:firebase, :mr_carrot_api_key)
    url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=#{api_key}"
    logger = fb_logger
    logger.info('Authenticate firebase token')
    logger.info("API KEY #{api_key}")
    logger.info("Authenticate with token #{token}")

    firebase_verification_call = HTTParty.post(url, headers: { 'Content-Type' => 'application/json' }, body: { 'idToken' => token }.to_json)
    logger.info("Response #{firebase_verification_call.response}")

    if firebase_verification_call.response.code == '200'
      logger.info('Success')
      firebase_infos = firebase_verification_call.parsed_response
      phone_number = firebase_infos['users'].first['phoneNumber']
      logger.info("phonenumber #{phone_number}")
      #phone_number.delete_prefix!('+')
      return phone_number, ""

    
    else

      logger.info("falied, with error #{firebase_verification_call.parsed_response}")
      response = firebase_verification_call.parsed_response
      message = response['error']['message']
      return nil, message
    end
  end

  def fb_logger
    logger ||= ActiveSupport::Logger.new("#{Rails.root}/log/firebase_auth.log")
  end
end
