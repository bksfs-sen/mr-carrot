class Api::V1::UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :first_name, :last_name, :email, :unconfirmed_mobile_number, :mobile_number, :is_verified, :confirmation_token, :confirmation_sent_at

  attribute :full_name do |object|
    "#{object&.first_name} #{object&.last_name}"
  end

  attribute :mobile_number, if: proc {|object, params| params[:show_profile_data].present? && params[:show_profile_data] == true} do |object, params|
    object.mobile_number.to_s[4..]
  end

  attribute :token, if: proc {|object, params| params[:token].present? && params[:token] == true} do |object, params|
    payload = {}
    payload[:user_id] = object.id
    payload[:device] = params[:device_id]
    object.get_token(payload)
  end
end
