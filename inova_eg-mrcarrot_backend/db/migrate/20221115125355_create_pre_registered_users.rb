class CreatePreRegisteredUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :pre_registered_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email

      t.timestamps
    end
  end
end
