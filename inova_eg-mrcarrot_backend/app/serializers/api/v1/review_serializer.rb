class Api::V1::ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :description, :rate, :sub_order_id

  attribute :user_name do |object|
    "#{object&.user&.first_name} #{object&.user&.last_name}"
  end
end
