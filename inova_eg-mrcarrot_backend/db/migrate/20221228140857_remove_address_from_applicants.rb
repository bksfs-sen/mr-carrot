class RemoveAddressFromApplicants < ActiveRecord::Migration[6.1]
  def change
    remove_reference :applicants, :address, null: false, foreign_key: true
  end
end
