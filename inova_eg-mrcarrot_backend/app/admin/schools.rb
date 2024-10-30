ActiveAdmin.register School do
  menu parent: I18n.t('activerecord.menu.lookup')
  permit_params do
    permitted = [
      :id,
      *AVAILABLE_LOCALES.map { |locale| "name_#{locale}" },
      address_attributes: [:id, :region_id, :street_name, :building_name, :landmark, :_create, :_update, :_destroy]
    ]
    permitted
  end
  filter :region

  index do
    selectable_column
    id_column
    AVAILABLE_LOCALES.each do |locale|
      column I18n.t("activerecord.attributes.school.name_#{locale}", default: "Name (#{locale.upcase})") do |school|
        school.send("name_#{locale}")
      end
    end
    actions
  end

  csv do
    AVAILABLE_LOCALES.each do |locale|
      column I18n.t("activerecord.attributes.school.name_#{locale}", default: "Name (#{locale.upcase})") do |school|
        school.send("name_#{locale}")
      end
    end
    column :created_at, label: I18n.t("activerecord.attributes.school.created_at", default: 'Created At')
    column :updated_at, label: I18n.t("activerecord.attributes.school.updated_at", default: 'Updated At')
  end

  form do |f|
    f.inputs I18n.t('activerecord.models.school.one', default: 'School Details') do
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.school.name_#{locale}", default: "Name (#{locale.upcase})")
      end
    end

    f.inputs I18n.t('activerecord.models.address.one', default: 'Address'), for: [:address, f.object.address || Address.new] do |address|
      address.input :region, label: I18n.t('activerecord.attributes.address.region_id', default: 'Region')
      address.input :street_name, label: I18n.t('activerecord.attributes.address.street_name', default: 'Street Name')
      address.input :building_name, label: I18n.t('activerecord.attributes.address.building_name', default: 'Building Name')
      address.input :landmark, label: I18n.t('activerecord.attributes.address.landmark', default: 'Landmark')
    end
    f.actions
  end

  show do
    attributes_table do
      AVAILABLE_LOCALES.each do |locale|
        row I18n.t("activerecord.attributes.school.name_#{locale}", default: "Name (#{locale.upcase})") do |school|
          school.send("name_#{locale}")
        end
      end
      row :created_at, label: I18n.t("activerecord.attributes.school.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.school.updated_at", default: 'Updated At')
    end

    panel I18n.t('activerecord.models.address.one', default: 'Address') do
      table_for school.address do
        column I18n.t('activerecord.attributes.address.region_id', default: 'Region'), &:region
        column I18n.t('activerecord.attributes.address.street_name', default: 'Street Name'), &:street_name
        column I18n.t('activerecord.attributes.address.building_name', default: 'Building Name'), &:building_name
        column I18n.t('activerecord.attributes.address.landmark', default: 'Landmark'), &:landmark
      end
    end

    panel I18n.t('activerecord.models.applicant.other', default: 'Applicants') do
      table_for school.applicants do
        column I18n.t('activerecord.attributes.applicant.name', default: 'Name'), &:name
        column I18n.t('activerecord.attributes.applicant.education_level', default: 'Education Level'), &:education_level
      end
    end
  end
end
