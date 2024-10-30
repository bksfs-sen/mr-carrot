class Api::V1::ApplicantMedicalIssueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id

  attribute :medical_issue_name do |object|
    object&.medical_issue&.name
  end
end
