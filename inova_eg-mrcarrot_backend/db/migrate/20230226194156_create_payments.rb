class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.references :order, null: false, foreign_key: true
      t.string :payment_id
      t.integer :status
      t.string :message
      t.integer :payment_type

      t.timestamps
    end
  end
end
