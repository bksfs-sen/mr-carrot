class ApplicantMedicalIssue < ApplicationRecord
  belongs_to :applicant
  belongs_to :medical_issue
  def self.ransackable_associations(auth_object = nil)
    ["applicant", "medical_issue"]
  end
def self.ransackable_attributes(auth_object = nil)
    ["applicant_id", "created_at", "id", "medical_issue_id", "updated_at"]
  end
end
