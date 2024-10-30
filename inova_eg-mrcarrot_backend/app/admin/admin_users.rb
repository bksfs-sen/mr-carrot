ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation, :admin_user_type

  index do
    selectable_column
    id_column
    column :email
    column :admin_user_type
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :admin_user_type
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :admin_user_type
    end
    f.actions
  end

end
