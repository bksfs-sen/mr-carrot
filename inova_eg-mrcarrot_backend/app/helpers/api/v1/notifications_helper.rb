module Api::V1::NotificationsHelper
    def send_notification(registration_ids: [], options: set_notification_options)
        fcm = initialize_fcm
        response = fcm.send(registration_ids, options)
        log_fcm_request(response,registration_ids,options)
       # {:body=>"{\"multicast_id\":8145360910125335939,\"success\":5,\"failure\":0,\"canonical_ids\":0,\"results\":[{\"message_id\":\"0:1578927784886796%27b58545f9fd7ecd\"},{\"message_id\":\"0:1578927784895820%27b58545f9fd7ecd\"},{\"message_id\":\"0:1578927784885678%27b58545f9fd7ecd\"},{\"message_id\":\"0:1578927784886798%27b58545f9fd7ecd\"},{\"message_id\":\"0:1578927784886988%27b58545f9fd7ecd\"}]}", :headers=>{"content-type"=>["application/json; charset=UTF-8"], "date"=>["Mon, 13 Jan 2020 15:03:04 GMT"], "expires"=>["Mon, 13 Jan 2020 15:03:04 GMT"], "cache-control"=>["private, max-age=0"], "x-content-type-options"=>["nosniff"], "x-frame-options"=>["SAMEORIGIN"], "x-xss-protection"=>["1; mode=block"], "server"=>["GSE"], "alt-svc"=>["quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"], "accept-ranges"=>["none"], "vary"=>["Accept-Encoding"], "connection"=>["close"]}, :status_code=>200, :response=>"success", :canonical_ids=>[], :not_registered_ids=>[]}
    end

    def set_notification_options(data: {}, notificaton: {}, priority: "high", additional_data: {})
        options = 
        {
            data: data, 
            notification: notificaton,
            priority: priority
        }.merge(additional_data)
    end
    def prepare_notification(registration_ids: [],notification_data: {}, data:{})

        notification_options = set_notification_options(data: data, notificaton: notification_data)
        send_notification(registration_ids: registration_ids, options: notification_options)
        
    end

    def send_notification_to_users(users: nil, notification: nil, data: nil)
        @devices = Device.joins('JOIN users ON users.id = devices.authenticable_id AND devices.authenticable_type = User AND devices.logged_out = false') 
        devices_ar = @devices.where("devices.locale = :locale", locale: 0)
        devices_en = @devices.where("devices.locale = :locale", locale: 1)
        notification_data_ar = {
            :title => notification.title_ar,
            :body => notification.message_ar,
        }
        notification_data_en = {
            :title => notification.title_en,
            :body => notification.message_en,
        }
        registration_ids_ar = devices_ar.pluck(:fcm_token).uniq
        registration_ids_en = devices_en.pluck(:fcm_token).uniq
        prepare_notification(registration_ids: registration_ids_ar,notification_data: notification_data_ar, data: data) if registration_ids_ar.any?
        prepare_notification(registration_ids: registration_ids_en,notification_data: notification_data_en, data: data) if registration_ids_en.any?
    end


    private 
    def initialize_fcm
        require 'fcm'
        fcm = FCM.new(FCM_SERVER_KEY)
    end
    def log_fcm_request(response,registration_ids,options)
        logger = notification_logger
        logger.info("=" * 50)
        logger.info("registration_ids #{registration_ids.inspect}")
        logger.info(options.inspect)
        logger.info("server key #{FCM_SERVER_KEY}")
        logger.info("Response body #{response[:body].gsub(/[\"]/,"")}")
        logger.info("=" * 50)
     
    end
    
    
    def notification_logger
      logger ||= Logger.new("#{Rails.root}/log/notifications.log")
      return logger
    end
    

end