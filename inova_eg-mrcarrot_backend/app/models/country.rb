class Country < ApplicationRecord

    has_many :cities, dependent: :destroy
    has_many :official_vacations, dependent: :destroy

    extend Mobility
    translates :name, type: :string, locale_accessors: [:en, :ar]
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "updated_at"]
  end
    def self.ransackable_associations(auth_object = nil)
    ["cities", "official_vacations", "string_translations"]
  end
end
