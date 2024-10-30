class MedicalIssue < ApplicationRecord
    has_many :applicant_medical_issues, dependent: :destroy
    has_many :applicants, through: :applicant_medical_issues

    extend Mobility
    translates :name, type: :string
 def self.ransackable_associations(auth_object = nil)
    ["applicant_medical_issues", "applicants", "string_translations"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "updated_at"]
  end
end
