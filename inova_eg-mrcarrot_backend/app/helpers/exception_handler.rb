module ExceptionHandler
    # provides the more graceful `included` method
    extend ActiveSupport::Concern

    # Define custom error subclasses - rescue catches `StandardErrors`
    class AuthenticationError < StandardError; end
    class MissingToken < StandardError; end
    class InvalidToken < StandardError; end
    class InvalidDeviceId < StandardError; end
    class InvalidUserData < StandardError; end
    class InvalidCode < StandardError; end
    class GuestUnAuthorized < StandardError; end
    class InvalidParameters < StandardError; end
    class ArgumentError < StandardError; end
    class AccountNotFound < StandardError; end
    class UnAuthorized < StandardError; end
    class AccountNotVerified < StandardError; end
    class UserSaveError < StandardError; end
    class NotAcceptable < StandardError; end
    class RecordSaveError < StandardError; end
    class DublicateUnconfirmedEmailError < StandardError; end
    class ChatCreationError < StandardError; end
    class DeletionError < StandardError; end
    class ExpiredConfirmationToken < StandardError; end
    class WrongConfirmationToken < StandardError; end

    included do
      rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
      rescue_from ExceptionHandler::GuestUnAuthorized, with: :guest_not_allowed
      rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
      rescue_from ExceptionHandler::AccountNotFound, with: :account_not_found
      rescue_from ExceptionHandler::MissingToken, with: :unauthorized_request
      rescue_from ExceptionHandler::InvalidToken, with: :unauthorized_request
      rescue_from ExceptionHandler::InvalidDeviceId, with: :four_twenty_two
      rescue_from ExceptionHandler::AccountNotVerified, with: :four_twenty_two
      rescue_from ExceptionHandler::InvalidUserData, with: :four_twenty_two
      rescue_from ExceptionHandler::InvalidCode, with: :four_twenty_two
      rescue_from ExceptionHandler::InvalidParameters, with: :invalid_parameters
      rescue_from ExceptionHandler::ArgumentError, with: :invalid_parameters
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      rescue_from Pundit::NotAuthorizedError, with: :access_forbidden
      rescue_from ExceptionHandler::UserSaveError, with: :four_twenty_two
      rescue_from ExceptionHandler::NotAcceptable, with: :four_twenty_two
      rescue_from ExceptionHandler::RecordSaveError, with: :four_twenty_two
      rescue_from ExceptionHandler::DublicateUnconfirmedEmailError, with: :four_twenty_two
      rescue_from ExceptionHandler::ChatCreationError, with: :four_twenty_two
      rescue_from ExceptionHandler::DeletionError, with: :four_twenty_two
      rescue_from ExceptionHandler::ExpiredConfirmationToken, with: :four_twenty_two
      rescue_from ExceptionHandler::WrongConfirmationToken, with: :four_twenty_two
      # rescue_from StandardError, with: :default_error
      # rescue_from ActionController::RoutingError, with: :route_not_found
    end
    private

    # JSON response with message; Status code 422 - unprocessable entity
    def four_twenty_two(e)
      excep_logger().info("442 #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({ message: e.message }, :unprocessable_entity)
    end
    def something_went_wrong(e)
      excep_logger().info("Something went wrong #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: 'Something went wrong'}, :unprocessable_entity)
    end
    # JSON response with message; Status code 401 - Unauthorized
    def unauthorized_request(e)
      excep_logger().info("Unauthorized #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({ message: e.message }, 401)
    end
    def fb_request(e)
      excep_logger().info("FB request #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, e.http_status )
    end
    def invalid_parameters(e)
      excep_logger().info("Invalid Params #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :expectation_failed)
    end

    def guest_not_allowed(e)
      excep_logger().info("Guest not allowed #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :method_not_allowed)
    end

    def account_not_found(e)
      excep_logger().info("Account Not found #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :not_found)
    end

    def record_not_found(e)
      excep_logger().info("Record not found #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :not_found)
    end

    def default_error(e)
      excep_logger().info("Default Error #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :server_error)
    end
    def route_not_found(e)
      excep_logger().info("Route not found #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: e.message}, :not_found)
    end

    def access_forbidden(e)
      excep_logger().info("Access Forbidden #{e.message}")
      excep_logger().info("Full trace #{e.backtrace.join("\n")}")
      json_response({message: "You're not allowed to do this action"}, 403)
    end

    def excep_logger
      logger ||= Logger.new("#{Rails.root}/log/exceptions.log")
      return logger
  end
end