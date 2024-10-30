class RemovePackageFromSubOrders < ActiveRecord::Migration[6.1]
  def change
    remove_reference :sub_orders, :package, null: false, foreign_key: true
  end
end
