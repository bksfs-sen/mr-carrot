class Region < ApplicationRecord
  extend Mobility

  belongs_to :city
  has_many :neighborhoods

  translates :name, backend: :key_value, type: :string
  def self.ransackable_attributes(auth_object = nil)
    ["city_id", "created_at", "id", "name", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["city", "neighborhoods"]
  end
end
