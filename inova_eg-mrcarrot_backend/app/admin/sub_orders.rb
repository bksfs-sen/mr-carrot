ActiveAdmin.register SubOrder do

  permit_params :order_id, :applicant_id, :num_of_months, :start_date, :expiration_status


end
