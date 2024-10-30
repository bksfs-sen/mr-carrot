class Api::V1::SubOrderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :order_id, :applicant_id, :num_of_months, :start_date, :expiration_status,
  :created_at, :updated_at

  attribute :applicant_name do |object|
    object&.applicant&.name
  end

  attribute :package_name_en do |object|
    object&.order&.package&.name_en
  end

  attribute :package_name_ar do |object|
    object&.order&.package&.name_ar
  end

  attribute :package_id do |object|
    object&.order&.package.id
  end

  attribute :vacancies do |object|
    Api::V1::VacancySerializer.new(object&.vacancies).serializable_hash[:data].map{ |vacancy| vacancy[:attributes]}
  end

  attribute :review do |object|
    Api::V1::ReviewSerializer.new(object.review).serializable_hash[:data][:attributes] if object.review
  end
end
