class CreateOfficialVacations < ActiveRecord::Migration[6.1]
  def change
    create_table :official_vacations do |t|
      t.references :country, null: false, foreign_key: true
      t.string :name
      t.string :date

      t.timestamps
    end
  end
end
