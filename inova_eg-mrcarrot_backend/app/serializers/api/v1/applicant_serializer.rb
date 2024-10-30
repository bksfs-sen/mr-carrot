class Api::V1::ApplicantSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :name, :education_level, :medical_issue_description, :school_id

  attribute :medical_issues do |object|
    Api::V1::MedicalIssueSerializer.new(object&.medical_issues).serializable_hash[:data].
    map{ |applicant_medical_issue| applicant_medical_issue[:attributes]}
  end

  attribute :school_name do |object|
    object&.school&.name
  end

  attribute :address do |object|
    object&.address
  end

  attribute :education_level_id do |object|
    Applicant.education_levels[object.education_level]
  end
end
