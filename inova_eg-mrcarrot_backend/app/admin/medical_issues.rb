ActiveAdmin.register MedicalIssue do
  menu parent: I18n.t('activerecord.menu.lookup')

  permit_params do
    permitted = []
    permitted += AVAILABLE_LOCALES.map { |locale| "name_#{locale}".to_sym }
    permitted
  end
  filter :name_cont, label: "Name"

  index do
    selectable_column
    id_column
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: I18n.t("activerecord.attributes.medical_issue.name_#{locale}", default: "#{locale.upcase} Name")
    end
    actions
  end

  csv do
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: I18n.t("activerecord.attributes.medical_issue.name_#{locale}", default: "#{locale.upcase} Name")
    end
    column :created_at, label: I18n.t("activerecord.attributes.medical_issue.created_at", default: 'Created At')
    column :updated_at, label: I18n.t("activerecord.attributes.medical_issue.updated_at", default: 'Updated At')
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.medical_issue.name_#{locale}", default: "#{locale.upcase} Name")
      end
    end
    f.actions
  end

  show do
    attributes_table do
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: I18n.t("activerecord.attributes.medical_issue.name_#{locale}", default: "#{locale.upcase} Name")
      end
      row :created_at, label: I18n.t("activerecord.attributes.medical_issue.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.medical_issue.updated_at", default: 'Updated At')
    end
  end
end