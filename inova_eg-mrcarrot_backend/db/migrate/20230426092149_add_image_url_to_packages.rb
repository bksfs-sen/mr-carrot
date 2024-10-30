class AddImageUrlToPackages < ActiveRecord::Migration[6.1]
  def change
    add_column :packages, :image_url, :string
  end
end
