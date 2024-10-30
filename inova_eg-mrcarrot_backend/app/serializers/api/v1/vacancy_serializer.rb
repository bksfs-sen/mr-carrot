class Api::V1::VacancySerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :sub_order_id, :date
end
