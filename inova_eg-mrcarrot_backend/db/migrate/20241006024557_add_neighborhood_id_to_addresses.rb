class AddNeighborhoodIdToAddresses < ActiveRecord::Migration[6.1]
  def change
    add_reference :addresses, :neighborhood, foreign_key: true
  end
end
