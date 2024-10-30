class CreateSubOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_orders do |t|
      t.references :order, null: false, foreign_key: true
      t.references :package, null: false, foreign_key: true
      t.references :applicant, null: false, foreign_key: true
      t.integer :num_of_months
      t.string :start_date
      t.integer :expiration_status
      t.integer :subscription_status

      t.timestamps
    end
  end
end
