class RegionsController < ApiController
  skip_before_action :authorize_request

  def index
    paginated_results = custom_paginate(Region.all)
    response_json(
      status: :ok,
      data: { regions: paginated_results[:paginated_collection].map { |record| record.as_json }},
      extra: paginated_results[:pagination_info]
    )
  end
end
