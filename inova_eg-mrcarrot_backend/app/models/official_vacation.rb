class OfficialVacation < ApplicationRecord
  belongs_to :country

  extend Mobility
  translates :name, type: :string, locale_accessors: [:en, :ar]
  def self.ransackable_attributes(auth_object = nil)
    ["country_id", "created_at", "date", "id", "name", "updated_at"]
  end
 def self.ransackable_associations(auth_object = nil)
    ["country", "string_translations"]
  end
end
