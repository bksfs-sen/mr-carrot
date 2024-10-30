class UserMailer < ApplicationMailer

    def pre_registration_email(name, email)
        @name = name
        @email = email
        @subject = "Welcom"
        mail(to: @email, subject: @subject)
    end

    def contact_us_email(name, email)
        @name = name
        @email = email
        mail(to: @email, subject: "Contact Us Request")
    end

    def admin_notification_email(name, email, subject, message)
        @name = name
        @message = message
        mail(to: "#{email}", subject: subject)
    end

end
