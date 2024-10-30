class AdminUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  enum admin_user_type: { super_admin: 0, admin: 1, restaurant: 2 }, _default: :super_admin

  has_many :meals, dependent: :destroy

  def self.ransackable_attributes(auth_object = nil)
    ["admin_user_type", "created_at", "email", "encrypted_password", "id", "remember_created_at", "reset_password_sent_at", "reset_password_token", "updated_at"]
  end
end
