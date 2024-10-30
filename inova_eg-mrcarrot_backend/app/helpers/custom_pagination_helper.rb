module CustomPaginationHelper
  def custom_paginate(collection)
    page = params[:page_number] || 1
    per_page = params[:page_size] || 10
    paginated_collection = collection.page(page).per(per_page)
    pagination_info = {
      total_count: paginated_collection.total_count,
      page_number: page.to_i,
      page_size: per_page.to_i,
      total_pages: paginated_collection.total_pages
    }
    { paginated_collection: paginated_collection, pagination_info: pagination_info }
  end
end
