class Meal < ApplicationRecord
  belongs_to :admin_user
  has_many :package_meals, dependent: :destroy
  has_many :packages, through: :package_meals

  extend Mobility
  
  translates :description, type: :text, locale_accessors: [:en, :ar]
  def self.ransackable_attributes(auth_object = nil)
    ["admin_user_id", "created_at", "description", "id", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["admin_user", "package_meals", "packages", "text_translations"]
  end
end
