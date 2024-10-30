class Api::V1::PackageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :price, :image_url, :rate

  attribute :name do |object, params|
    object.name(locale: params[:locale])
  end

  attribute :country do |object|
    object&.country&.name
  end

  attribute :package_meals do |object, params|
    Api::V1::PackageMealSerializer.new(object&.package_meals, params: {locale: params[:locale]}).serializable_hash[:data].map {|package_meal| package_meal[:attributes]}
  end

  attribute :package_reviews do |object|
    Api::V1::ReviewSerializer.new(object&.reviews).serializable_hash[:data].map {|review| review[:attributes]}
  end
end
