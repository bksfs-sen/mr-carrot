class Api::V1::MedicalIssueSerializer
  include FastJsonapi::ObjectSerializer

  attribute :value do |object|
    object.id
  end

  attribute :label do |object|
    object.name
  end
end
