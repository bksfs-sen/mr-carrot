class Api::V1::NotificationsController < ApiController

    after_action :update_seen_notifications, only: [:index]
    
    def index
        @paginated_notifications = @current_user.notifications.order(id: :desc).page(params[:page_number]).per(params[:page_size])
        return json_response(notifications: Api::V1::NotificationSerializer.new(@paginated_notifications, params: {current_user: @current_user}).serializable_hash[:data].map{ |notification| notification[:attributes]}, status: :ok)
    end

    private
    def update_seen_notifications
        user_notifications = UserNotification.where(notified: @current_user,
             notification_id: @paginated_notifications.pluck(:id), is_seen: false).
             update_all(is_seen: true, seen_time: DateTime.now)
    end
end