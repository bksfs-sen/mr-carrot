class AddAttributesToAddress < ActiveRecord::Migration[6.1]
  def change
    add_column :addresses, :lat, :string
    add_column :addresses, :long, :string
    add_column :addresses, :full_address, :text
  end
end
