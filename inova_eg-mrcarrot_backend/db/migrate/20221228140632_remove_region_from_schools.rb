class RemoveRegionFromSchools < ActiveRecord::Migration[6.1]
  def change
    remove_reference :schools, :region, null: false, foreign_key: true
  end
end
