class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :unconfirmed_mobile_number
      t.string :mobile_number
      t.boolean :is_verified
      t.boolean :notifications_enabled

      t.timestamps
    end
  end
end
