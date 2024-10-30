class AddRateToPackage < ActiveRecord::Migration[6.1]
  def change
    add_column :packages, :rate, :float
  end
end
