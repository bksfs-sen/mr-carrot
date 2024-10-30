ActiveAdmin.register OfficialVacation do
  menu parent: I18n.t('activerecord.menu.lookup')

  permit_params do
    permitted = [:country_id, :date]
    permitted += AVAILABLE_LOCALES.map { |locale| "name_#{locale}".to_sym }
    permitted
  end
  filter :country, label: I18n.t('activerecord.model.country.one')

  index do
    selectable_column
    id_column
    column :country, label: I18n.t('activerecord.attributes.official_vacation.country_id')
    column :date, label: I18n.t('activerecord.attributes.official_vacation.date')
    AVAILABLE_LOCALES.each do |locale|
      column I18n.t("activerecord.attributes.official_vacation.name_#{locale}", default: "Name (#{locale.upcase})") do |official_vacation|
        official_vacation.send("name_#{locale}")
      end
    end
    actions
  end

  csv do
    column :country, label: I18n.t('activerecord.attributes.official_vacation.country_id', default: 'Country')
    column :date, label: I18n.t('activerecord.attributes.official_vacation.date', default: 'Date')
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: I18n.t("activerecord.attributes.official_vacation.name_#{locale}", default: "#{locale.upcase} Name")
    end
    column :created_at, label: I18n.t("activerecord.attributes.official_vacation.created_at", default: 'Created At')
    column :updated_at, label: I18n.t("activerecord.attributes.official_vacation.updated_at", default: 'Updated At')
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      f.input :country, label: I18n.t('activerecord.attributes.official_vacation.country_id', default: 'Country')
      f.input :date, label: I18n.t('activerecord.attributes.official_vacation.date', default: 'Date')
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.official_vacation.name_#{locale}", default: "#{locale.upcase} Name")
      end
    end
    f.actions
  end

  show do
    attributes_table do
      row :country, label: I18n.t('activerecord.model.country.one')
      row :date, label: I18n.t('activerecord.attributes.official_vacation.date')
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: I18n.t("activerecord.attributes.official_vacation.name_#{locale}", default: "#{locale.upcase} Name")
      end
      row :created_at, label: I18n.t("activerecord.attributes.official_vacation.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.official_vacation.updated_at", default: 'Updated At')
    end
  end
end
