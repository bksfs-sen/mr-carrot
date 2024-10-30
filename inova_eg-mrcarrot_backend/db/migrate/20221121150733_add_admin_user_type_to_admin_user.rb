class AddAdminUserTypeToAdminUser < ActiveRecord::Migration[6.1]
  def change
    add_column :admin_users, :admin_user_type, :integer
  end
end
