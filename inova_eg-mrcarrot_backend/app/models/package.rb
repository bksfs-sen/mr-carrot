class Package < ApplicationRecord

  extend Mobility
  translates :name, type: :string, locale_accessors: [:en, :ar]

  belongs_to :country
  has_many :package_meals, dependent: :destroy
  has_many :meals, through: :package_meals
  has_many :orders, dependent: :nullify
  has_many :sub_orders, through: :orders
  has_many :reviews, through: :sub_orders

  # has_one_attached :image

  validates_presence_of :image_url

  accepts_nested_attributes_for :package_meals, :allow_destroy => true

  # def update_rate
  #   total = 0
  #   num_of_reviews = 0
  #   self.reviews.each do |review|
  #     if review.rate != nil
  #       total = total + review.rate
  #       num_of_reviews = num_of_reviews + 1
  #     end
  #   end
  #   self.rate = total/num_of_reviews.to_f
  #   self.save!
  # end
  def self.ransackable_associations(auth_object = nil)
    ["country", "meals", "orders", "package_meals", "reviews", "string_translations", "sub_orders"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["country_id", "created_at", "id", "image_url", "name", "price", "rate", "updated_at"]
  end

end
