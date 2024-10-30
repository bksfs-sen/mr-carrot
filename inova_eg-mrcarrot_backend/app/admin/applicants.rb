ActiveAdmin.register Applicant do
  permit_params do
    permitted = [
      :user_id,
      :school_id,
      :name,
      :education_level,
      :medical_issue_description
    ]
    permitted
  end

  index do
    selectable_column
    id_column
    column :user_id
    column :school_id
    column :name
    column :education_level
    column :medical_issue_description
    actions
  end

  show do
    attributes_table do
      row :user_id
      row :school_id
      row :name
      row :education_level
      row :medical_issue_description
    end
  end

  form do |f|
    f.inputs I18n.t('activerecord.models.applicant.one', default: 'Applicant Details') do
      f.input :user_id
      f.input :school_id
      f.input :name
      f.input :education_level
      f.input :medical_issue_description
    end
    f.actions
  end

  csv do
    column :user_id
    column :school_id
    column :name
    column :education_level
    column :medical_issue_description
  end
end
