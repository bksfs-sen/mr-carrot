class Api::V1::OfficialVacationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :date

  attribute :country do |object|
    object&.country&.name
  end
end
