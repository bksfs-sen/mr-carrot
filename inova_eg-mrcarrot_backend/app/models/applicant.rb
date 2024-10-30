class Applicant < ApplicationRecord
  belongs_to :user
  belongs_to :school
  has_one :address, as: :addressable, dependent: :destroy

  has_many :applicant_medical_issues, dependent: :destroy
  has_many :medical_issues, through: :applicant_medical_issues

  enum education_level: {grade_1: 1, grade_2: 2, grade_3: 3, grade_4: 4, grade_5: 5, grade_6: 6, grade_7: 7,
    grade_8: 8, grade_9: 9, grade_10: 10, grade_11: 11, grade_12: 12}
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "education_level", "id", "medical_issue_description", "name", "school_id", "updated_at", "user_id"]
  end
    def self.ransackable_associations(auth_object = nil)
    ["address", "applicant_medical_issues", "medical_issues", "school", "user"]
  end
end
