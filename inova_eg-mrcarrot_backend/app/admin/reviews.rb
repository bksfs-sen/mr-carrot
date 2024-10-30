ActiveAdmin.register Review do


  permit_params :user_id, :description, :rate, :sub_order_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:user_id, :description, :rate, :sub_order_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
