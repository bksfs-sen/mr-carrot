class Api::V1::OrderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :subscription_status
=begin
  attribute :package_name do |object|
    object&.package&.name
  end

  attribute :package_price do |object|
    object&.package&.price
  end
=end
  attribute :package do |object|
    Api::V1::PackageSerializer.new(object&.package).serializable_hash[:data][:attributes]
  end

  attribute :sub_orders do |object|
    Api::V1::SubOrderSerializer.new(object&.sub_orders).serializable_hash[:data].map{ |sub_order| sub_order[:attributes]}
  end

  attribute :official_vacations do |object|
    official_vacations = OfficialVacation.all
    Api::V1::OfficialVacationSerializer.new(official_vacations).serializable_hash[:data].map{ |official_vacation| official_vacation[:attributes]}
  end

  attribute :total_amount do |object|
    object.get_amount
  end

  attribute :total_amount_with_vat do |object|
    object.get_amount(with_vat=true)
  end

end
