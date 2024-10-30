class Payment < ApplicationRecord
  belongs_to :order

  enum status: {initiated: 0 , paid: 1 , failed: 2 , authorized: 3 , captured: 4 , refunded: 5 , voided: 6}
  enum payment_type: {creditcard: 0, applepay: 1, stcpay: 2}

  validates :payment_id, uniqueness: true

  after_save :set_order_status

  def set_order_status
    self.order.update(subscription_status: "done") if self.status == "paid"
  end
end
