class Neighborhood < ApplicationRecord
 extend Mobility
  belongs_to :region


  translates :name, backend: :key_value, type: :string, locale_accessors: [:en, :ar]
 def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "region_id", "updated_at"]
  end
    def self.ransackable_associations(auth_object = nil)
    ["region", "string_translations"]
  end
end
