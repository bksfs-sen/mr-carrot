class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.references :admin_user, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
