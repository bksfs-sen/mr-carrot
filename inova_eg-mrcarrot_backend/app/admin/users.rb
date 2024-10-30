ActiveAdmin.register User do
  permit_params :first_name, :last_name, :unconfirmed_mobile_number, :mobile_number, :is_verified, :notifications_enabled, :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :confirmation_token, :confirmation_sent_at
end
