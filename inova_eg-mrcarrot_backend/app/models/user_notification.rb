class UserNotification < ApplicationRecord
  belongs_to :notification
  belongs_to :notified, polymorphic: true

  attribute :is_seen, :boolean, default: false
 def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "is_seen", "notification_id", "notified_id", "notified_type", "seen_time", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["notification", "notified"]
  end
end
