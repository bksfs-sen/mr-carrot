ActiveAdmin.register Order do

  permit_params :user_id, :package_id, :subscription_status


  preserve_default_filters!
  filter :where_medical_issue, as: :select, collection: -> { MedicalIssue.all }
  filter :where_region, as: :select, collection: -> { Region.all }

end
