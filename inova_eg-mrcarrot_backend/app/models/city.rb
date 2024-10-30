class City < ApplicationRecord
  extend Mobility

  belongs_to :country
  has_many :regions
  translates :name, backend: :key_value, type: :string
  def self.ransackable_attributes(auth_object = nil)
    ["country_id", "created_at", "id", "name", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["country", "regions", "string_translations"]
  end
end
