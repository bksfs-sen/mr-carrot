class Address < ApplicationRecord
  belongs_to :region
  has_one :applicant
  belongs_to :neighborhood
  def self.ransackable_attributes(auth_object = nil)
    ["addressable_id", "addressable_type", "building_name", "created_at", "full_address", "id", "lat", "long", "landmark", "neighborhood_id", "region_id", "street_name", "updated_at"]
  end
end
