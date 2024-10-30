class CreatePackageMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :package_meals do |t|
      t.references :package, null: false, foreign_key: true
      t.references :meal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
