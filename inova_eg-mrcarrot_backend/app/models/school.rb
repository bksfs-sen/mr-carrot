class School < ApplicationRecord

  extend Mobility
  translates :name, type: :string, locale_accessors: [:en, :ar]

  has_one :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :address, :allow_destroy => true
  has_many :applicants, dependent: :nullify
def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["address", "applicants"]
  end
end
