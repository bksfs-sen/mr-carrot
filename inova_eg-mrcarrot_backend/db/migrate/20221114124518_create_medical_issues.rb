class CreateMedicalIssues < ActiveRecord::Migration[6.1]
  def change
    create_table :medical_issues do |t|
      t.string :name

      t.timestamps
    end
  end
end
