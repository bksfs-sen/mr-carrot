class ApplicationController < ActionController::Base
    include Api::V1::AmazonS3

    def access_denied(exception)
        reset_session
        redirect_to '/admin/login', alert: exception.message
    end

    def set_admin_locale
        I18n.locale = params[:locale] || I18n.default_locale
    end

    def default_url_options
        { locale: I18n.locale }
    end
  
end
