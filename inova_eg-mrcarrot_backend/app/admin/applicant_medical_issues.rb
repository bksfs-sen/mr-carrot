ActiveAdmin.register ApplicantMedicalIssue do
  # preserve_default_filters!
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :applicant_id, :medical_issue_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:applicant_id, :medical_issue_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  filter  :applicant
  filter   :medical_issue

  index do
    selectable_column
    id_column
    column :applicant
    column :user do |applicant_medical_issue|
      applicant_medical_issue.applicant.user
    end
    column :medical_issue
    actions
  end

end
