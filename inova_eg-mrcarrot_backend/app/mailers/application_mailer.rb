class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials.dig(:sender_mail, :email)
  before_action :attach_logo

  layout "mailer"

  private

  def attach_logo
    attachments.inline["logo.png"] = File.read("app/assets/images/logo.png")
  end
end
