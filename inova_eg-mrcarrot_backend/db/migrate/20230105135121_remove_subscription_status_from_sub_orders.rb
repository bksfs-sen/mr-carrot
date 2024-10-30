class RemoveSubscriptionStatusFromSubOrders < ActiveRecord::Migration[6.1]
  def change
    remove_column :sub_orders, :subscription_status, :integer
  end
end
