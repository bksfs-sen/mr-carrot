class NeighborhoodsController < ApiController
  skip_before_action :authorize_request

  def index
    @neighborhoods = Neighborhood.all
    @neighborhoods = @neighborhoods.where(region_id: params[:region_id]) if params[:region_id].present?
    paginated_results = custom_paginate(@neighborhoods)
    response_json(
      status: :ok,
      data: { neighborhoods: paginated_results[:paginated_collection].map { |record| record.as_json }},
      extra: paginated_results[:pagination_info]
    )
  end
end
