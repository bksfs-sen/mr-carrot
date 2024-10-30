class Api::V1::OfficialVacationsController < ApiController

    skip_before_action :authorize_request
    
    def index
        @official_vacations = OfficialVacation.where(country_id: official_vacancy_params[:country_id])
        return json_response(official_vacations: Api::V1::OfficialVacationSerializer.new(@official_vacations).serializable_hash[:data].map{ |official_vacation| official_vacation[:attributes]}, status: :ok)
    end

    private
    def official_vacancy_params
        defaults = {country_id: 1}
        params.permit(:country_id).reverse_merge(defaults)
    end
end