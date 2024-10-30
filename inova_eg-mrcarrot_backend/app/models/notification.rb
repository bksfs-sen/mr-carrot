class Notification < ApplicationRecord
  belongs_to :notifier, polymorphic: true
  has_many :user_notifications, dependent: :destroy
  has_many :users, through: :user_notifications, source: :notified, source_type: "User"

  enum notification_type: {system_nt: 0}

  attr_accessor :region_id
  attr_accessor :package_id
  attr_accessor :grade
  attr_accessor :school_id
  attr_accessor :sending_type

  enum sending_type: {notifications: 0, emails: 1, both: 2}

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "data", "data_id", "id", "message_ar", "message_en", "need_action", "notification_type", "notifier_id", "notifier_type", "title_ar", "title_en", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["notifier", "user_notifications", "users"]
  end
end
