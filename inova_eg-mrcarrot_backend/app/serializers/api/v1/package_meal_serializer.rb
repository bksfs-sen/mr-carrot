class Api::V1::PackageMealSerializer
  include FastJsonapi::ObjectSerializer
  attributes :meal_id

  attribute :meal_description do |object, params|
    object&.meal&.description(locale: params[:locale])
  end

end
