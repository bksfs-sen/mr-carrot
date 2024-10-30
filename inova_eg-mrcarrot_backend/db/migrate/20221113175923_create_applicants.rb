class CreateApplicants < ActiveRecord::Migration[6.1]
  def change
    create_table :applicants do |t|
      t.references :user, null: false, foreign_key: true
      t.references :school, null: false, foreign_key: true
      t.string :name
      t.integer :education_level
      t.text :medical_issue_description
      t.references :address, null: false, foreign_key: true

      t.timestamps
    end
  end
end
