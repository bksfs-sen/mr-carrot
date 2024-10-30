ActiveAdmin.register Notification do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title_en, :title_ar, :message_en, :message_ar, :notification_type, :notifier_type, :notifier_id, :data, :data_id, :need_action, :region_id, :package_id, :grade, :school_id, :sending_type
  #
  # or
  #
  # permit_params do
  #   permitted = [:title_en, :title_ar, :message_en, :message_ar, :notification_type, :notifier_type, :notifier_id, :data, :data_id, :need_action]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.object.notification_type = "system_nt"
    f.object.notifier_id = current_admin_user.id
    f.object.notifier_type = current_admin_user.class.name
    f.inputs do
      f.input :title_en
      f.input :title_ar
      f.input :message_en
      f.input :message_ar
      f.input :notification_type
      f.input :notifier_id, as: :hidden
      f.input :notifier_type, as: :hidden
      f.input :region_id, as: :select, collection: Region.all
      f.input :package_id, as: :select, collection: Package.all
      f.input :grade, as: :select, collection: Applicant.education_levels.map{ |key,value| key}
      f.input :school_id, as: :select, collection: School.all
      f.input :sending_type, as: :select
    end
    f.actions
  end


  controller do
    before_save do |notification|
      users_ids = []
      if notification.region_id
        addressable_ids = Address.where(region_id: notification.region_id, addressable_type: "Applicant").pluck(:addressable_id)
        users_ids = users_ids + Applicant.where(id: addressable_ids).pluck(:user_id)
      elsif notification.package_id
        users_ids = users_ids + Order.where(package_id: notification.package_id).pluck(:user_id)
      elsif notification.grade
        users_ids = users_ids + Applicant.where(education_level: notification.grade).pluck(:user_id)
      elsif notification.school_id
        users_ids = users_ids + Applicant.where(school_id: notification.school_id)
      end
      if notification.sending_type == "notifications"
        send_notifications(notification, users_ids)
      elsif notification.sending_type == "emails"
        send_emails(notification, users_ids)
      elsif notification.sending_type == "both"
        send_notifications(notification, users_ids)
        send_emails(notification, users_ids)
      end
    end

    after_create do |notification|
      notifiable_users = notification.users.where(notifications_enabled: true)
      data = {type: 'system'}
      send_notification_to_users(users: notifiable_users, notification: notification, data: data) if notifiable_users.any?
    end

    def send_notifications(notification, users_ids)
      notification.users << User.where(id: users_ids.uniq)
    end

    def send_emails(notification, users_ids)
      users_names_and_emails = User.where(id: users_ids.uniq).pluck(:first_name, :last_name, :email)
      users_names_and_emails.each do |first_name, last_name, email|
        begin
          UserMailer.admin_notification_email("#{first_name} #{last_name}", email, notification.title_en, notification.message_en).deliver_now!
        rescue Exception => e
          logger.warn "email delivery error = #{e}"
        end
      end
    end
  end
  
end
