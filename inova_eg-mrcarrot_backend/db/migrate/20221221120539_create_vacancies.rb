class CreateVacancies < ActiveRecord::Migration[6.1]
  def change
    create_table :vacancies do |t|
      t.references :sub_order, null: false, foreign_key: true
      t.string :date

      t.timestamps
    end
  end
end
