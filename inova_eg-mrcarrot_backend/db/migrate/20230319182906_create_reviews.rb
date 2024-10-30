class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.text :description
      t.integer :rate
      t.references :sub_order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
