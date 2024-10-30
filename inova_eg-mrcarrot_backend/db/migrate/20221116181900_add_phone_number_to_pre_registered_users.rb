class AddPhoneNumberToPreRegisteredUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :pre_registered_users, :phone_number, :string
  end
end
