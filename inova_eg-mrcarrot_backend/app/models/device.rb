class Device < ApplicationRecord
  belongs_to :authenticable, polymorphic: true
 def self.ransackable_attributes(auth_object = nil)
    ["authenticable_id", "authenticable_type", "created_at", "fcm_token", "id", "logged_out", "locale", "updated_at", "uuid"]
  end
end
