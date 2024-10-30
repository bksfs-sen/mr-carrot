class AddPackageToOrders < ActiveRecord::Migration[6.1]
  def change
    add_reference :orders, :package, null: false, foreign_key: true
  end
end
