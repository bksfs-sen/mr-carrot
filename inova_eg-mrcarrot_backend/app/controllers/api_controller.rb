class ApiController < ApplicationController

    include Api::V1::Response
    include Api::V1::NotificationsHelper
    include CustomPaginationHelper
    before_action :set_time_zone
    around_action :use_time_zone
   include CustomPaginationHelper
    before_action :set_time_zone
    around_action :use_time_zone

    skip_before_action :verify_authenticity_token
    before_action :authorize_request

    def authorize_request
        begin
            data = AuthorizeApiRequest.new(request.headers).call
            @current_user = data[:user]
            @current_user_device = data[:device]
        rescue ExceptionHandler::InvalidToken
            return json_response({message: I18n.t('invalid_token')}, :unprocessable_entity)
        end
    end
    def set_time_zone
        if request.headers["Timezone"].present? && ActiveSupport::TimeZone[request.headers["Timezone"].to_s].present?
        @time_zone = request.headers["Timezone"].to_s
        else
        @time_zone = "UTC"
        end
        puts "TIME ZONE IS #{@time_zone}"
    end

    def use_time_zone
        Time.use_zone(@time_zone) { yield }
    end
end
