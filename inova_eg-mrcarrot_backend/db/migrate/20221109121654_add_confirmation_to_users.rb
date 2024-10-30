class AddConfirmationToUsers < ActiveRecord::Migration[6.1]
  def up
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmation_sent_at, :datetime 
  end

  def down
    remove_column :users, :confirmation_token, :string
    remove_column :users, :confirmation_sent_at, :datetime
  end
end
