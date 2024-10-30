class CreateApplicantMedicalIssues < ActiveRecord::Migration[6.1]
  def change
    create_table :applicant_medical_issues do |t|
      t.references :applicant, null: false, foreign_key: true
      t.references :medical_issue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
