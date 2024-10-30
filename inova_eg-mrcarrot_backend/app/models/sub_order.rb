class SubOrder < ApplicationRecord
  belongs_to :order
  belongs_to :applicant
  has_many :vacancies, dependent: :destroy
  has_one :review, dependent: :destroy

  enum expiration_status: {initialized: 0, current: 1 , historical: 2}, _default: :initialized

  scope :user_orders, ->(user) {Order.where(user_id: user.id)}
  scope :current_sub_orders, ->(user) {where(order_id: user_orders(user).pluck(:id), expiration_status: "current")}
  scope :historical_sub_orders, ->(user) {where(order_id: user_orders(user).pluck(:id), expiration_status: "historical")}

  validates :applicant_id, uniqueness: {scope: :order_id}

  before_save :check_date_overlap, :if => Proc.new{ self.start_date_changed? || self.num_of_months_changed? }

  def check_date_overlap
    sub_order = SubOrder.joins(:order)
    .where("orders.package_id = #{self.order.package_id} AND
      sub_orders.applicant_id = #{self.applicant_id} AND
      sub_orders.expiration_status = #{SubOrder.expiration_statuses[:current]}")
    .first
    return unless sub_order
    if intervals_overlap?(self.start_date.to_date, self.start_date.to_date + num_of_months.months,
         sub_order.start_date.to_date, sub_order.start_date.to_date + num_of_months.months)
      self.errors.add(:base, "Start date and End date should`t overlap with another active subscription")
      raise ExceptionHandler::RecordSaveError
    end
  end

  def intervals_overlap?(start_a, end_a, start_b, end_b)
    return (start_a < end_b) && (end_a > start_b)
  end
def self.ransackable_attributes(auth_object = nil)
    ["applicant_id", "created_at", "expiration_date", "expiration_status", "id", "num_of_months", "order_id", "start_date", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["applicant", "order", "review", "vacancies"]
  end
end
