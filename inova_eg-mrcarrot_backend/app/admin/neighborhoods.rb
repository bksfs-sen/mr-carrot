ActiveAdmin.register Neighborhood do
  menu parent: I18n.t('activerecord.menu.lookup')

  permit_params do
    permitted = [:region_id]
    permitted += AVAILABLE_LOCALES.map { |locale| "name_#{locale}".to_sym }
    permitted
  end

      filter :name_cont, label: "Name"
filter :region
  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      f.input :region, label: I18n.t('activerecord.attributes.neighborhood.region_id', default: 'Region')
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.neighborhood.name_#{locale}", default: "#{locale.upcase} Name")
      end
    end
    f.actions
  end

  show do
    attributes_table do
      row :region, label: I18n.t('activerecord.attributes.neighborhood.region_id', default: 'Region')
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: I18n.t("activerecord.attributes.neighborhood.name_#{locale}", default: "#{locale.upcase} Name")
      end
      row :created_at, label: I18n.t("activerecord.attributes.neighborhood.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.neighborhood.updated_at", default: 'Updated At')
    end
  end
end
