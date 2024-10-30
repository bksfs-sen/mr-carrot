class Api::V1::PackagesController < ApiController
    skip_before_action :authorize_request, only: [:index]
    before_action :validate_locale

    def index
        paginated_results = custom_paginate(Package.all)
        response_json(
        status: :ok,
        data: { packages: paginated_results[:paginated_collection].map { |record| record.as_json(options: detailed_view) }},
        extra: paginated_results[:pagination_info]
        )
    end

    private
    def validate_locale
        @locale = request.headers["Accept-Language"].to_sym
        return json_response("Not acceptable locale", :unprocessable_entity) unless AVAILABLE_LOCALES.include? @locale
    end
end
