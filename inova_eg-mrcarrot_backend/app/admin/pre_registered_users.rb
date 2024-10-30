ActiveAdmin.register PreRegisteredUser do


  permit_params :first_name, :last_name, :email, :phone_number

  member_action :send_emails, method: 'post' do
    @pre_registered_users = PreRegisteredUser.all
    @pre_registered_users.each do |pre_registered_user|
        begin
            UserMailer.pre_registration_email("#{pre_registered_user.first_name} #{pre_registered_user.last_name}", pre_registered_user.email, "We are live now!", "You can register now").deliver_now!
            #render json: {data: {data: "Mail was sent successfully!"} }
        rescue  Exception => e
            #render json: {data: {data: "Mail was not sent"} }
            logger.warn "email delivery error = #{e}"
        end
    end
    redirect_to request.referrer, notice: 'Emails were sent successfully'
  end

  action_item only: :index do
    link_to 'Send Notification To Pre-registered Users', {:action => :send_emails, :id => -1}, :method => :post
  end

end
