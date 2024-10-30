class Api::V1::SchoolsController < ApiController
    skip_before_action :authorize_request

    def index
        @schools = School.all
        return json_response({schools: @schools}, :ok)
    end
end
