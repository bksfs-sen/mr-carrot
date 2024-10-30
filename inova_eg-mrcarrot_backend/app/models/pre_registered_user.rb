class PreRegisteredUser < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "first_name", "id", "last_name", "phone_number", "updated_at"]
  end
end
