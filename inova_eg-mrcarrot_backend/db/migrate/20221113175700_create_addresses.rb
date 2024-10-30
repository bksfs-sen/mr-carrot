class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.references :region, null: false, foreign_key: true
      t.string :street_name
      t.string :building_name
      t.string :landmark

      t.timestamps
    end
  end
end
