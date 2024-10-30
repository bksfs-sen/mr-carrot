class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  include Api::V1::NotificationsHelper
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Associations #
  has_many :applicants, dependent: :destroy
  has_many :orders, dependent: :nullify
  has_many :user_notifications, as: :notified, dependent: :destroy
  has_many :notifications, through: :user_notifications
  has_many :devices, as: :authenticable, dependent: :destroy
  has_many :reviews, dependent: :destroy

  # Scopes #

  # Defaults #
  attribute :is_verified, :boolean, default: :false

  # Validations #
  validates :mobile_number, uniqueness: true, allow_blank: true
  validate :unconfirmed_mobile_number_is_unique_on_confirmed_mobile_numbers

  # Callbacks #
  after_update :send_welcome_notification, :if => Proc.new{:saved_change_to_is_verified? && self.is_verified == true}

  # Methods #

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def generate_otp
    random = 0000
    loop do
        random = 6.times.map{rand(10)}.join
        break unless User.exists?(confirmation_token: random) && User.exists?(reset_password_token: random)
    end
    return random
  end

  def get_token(payload)
    JsonWebToken.encode(payload, true)
  end

  def unconfirmed_mobile_number_is_unique_on_confirmed_mobile_numbers
    self.errors.add(:unconfirmed_mobile_number, 'is already taken') if User.where(mobile_number: self.unconfirmed_mobile_number).exists? && self.unconfirmed_mobile_number != nil
  end

  def send_welcome_notification
    notification = Notification.new(
      title_en: "Welcome message",
      title_ar: "رسالة الترحيب",
      message_en: "Welcome to Mr Carrot App!",
      message_ar: "أهلا بك في تطبيق Mr Carrot!",
      notification_type: :system_nt,
      notifier_type: self.class.name,
      notifier_id: self.id
    )
    data = {type: 'system'}
    notification.users << self
    notification.save!
    notifiable_users = notification.users.where(notifications_enabled: true)
    send_notification_to_users(users: notifiable_users, notification: notification, data: data)
  end
  def self.ransackable_associations(auth_object = nil)
    ["applicants", "devices", "notifications", "orders", "reviews", "user_notifications"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["confirmation_sent_at", "confirmation_token", "created_at", "email", "encrypted_password", "first_name", "id", "is_verified", "last_name", "mobile_number", "notifications_enabled", "remember_created_at", "reset_password_sent_at", "reset_password_token", "unconfirmed_mobile_number", "updated_at"]
  end

end
