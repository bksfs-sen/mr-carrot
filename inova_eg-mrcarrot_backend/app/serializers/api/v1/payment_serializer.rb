class Api::V1::PaymentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :payment_id, :status, :message, :order_id, :payment_type
end
