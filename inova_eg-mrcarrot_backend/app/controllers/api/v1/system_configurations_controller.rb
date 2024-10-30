class Api::V1::SystemConfigurationsController < ApiController
    skip_before_action :authorize_request
    
    def create
        begin
            ActiveRecord::Base.transaction do
                @system_configuration = SystemConfiguration.new(system_configuration_params)
                raise ExceptionHandler::RecordSaveError unless @system_configuration.save
                return json_response(system_configuration: @system_configuration, status: :ok)
            end
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @system_configuration.errors.full_messages}, :unprocessable_entity)
        end
    end

    private
    def system_configuration_params
        params.require(:system_configuration).permit(:key, :value)
    end
end