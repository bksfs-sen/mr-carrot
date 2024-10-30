class Api::V1::NotificationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title_en, :title_ar, :message_en, :message_ar, :notification_type, :created_at, :need_action

  attribute :is_seen , if: proc {|object, params| params[:current_user].present?} do |object, params|
    object.user_notifications.first.is_seen
  end
end
