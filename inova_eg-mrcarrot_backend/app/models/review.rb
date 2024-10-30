class Review < ApplicationRecord
  belongs_to :user
  belongs_to :sub_order
  delegate :order, :to => :sub_order, :allow_nil => true
  delegate :package, :to => :order, :allow_nil => true

  validates :rate, numericality: {in: 1..5}

  after_create :update_average_rate

  def update_average_rate
    self.package&.update_rate
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "rate", "sub_order_id", "updated_at", "user_id"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["sub_order", "user"]
  end
end
