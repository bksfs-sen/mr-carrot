class AddSubscriptionStatusToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :subscription_status, :integer
  end
end
