class PackageMeal < ApplicationRecord
  belongs_to :package
  belongs_to :meal
  def self.ransackable_associations(auth_object = nil)
    ["meal", "package"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "meal_id", "package_id", "updated_at"]
  end
end
