class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.string :name
      t.float :price
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end
  end
end
