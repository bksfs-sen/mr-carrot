ActiveAdmin.register Region do
  menu parent: I18n.t('activerecord.menu.lookup')

  permit_params do
    permitted = [:city_id]
    permitted += AVAILABLE_LOCALES.map { |locale| "name_#{locale}".to_sym }
    permitted
  end
  filter :city, label: I18n.t('activerecord.attributes.region.city_id', default: 'City')
  index do
    selectable_column
    id_column
    column :city, label: I18n.t('activerecord.attributes.region.city_id', default: 'City')
    AVAILABLE_LOCALES.each do |locale|
      column I18n.t("activerecord.attributes.region.name_#{locale}", default: "Name (#{locale.upcase})") do |region|
        region.send("name_#{locale}")
      end
    end
    actions
  end

  csv do
    column :city, label: I18n.t('activerecord.attributes.region.city_id', default: 'City')
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: I18n.t("activerecord.attributes.region.name_#{locale}", default: "#{locale.upcase} Name")
    end
    column :created_at, label: I18n.t("activerecord.attributes.region.created_at", default: 'Created At')
    column :updated_at, label: I18n.t("activerecord.attributes.region.updated_at", default: 'Updated At')
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      f.input :city, label: I18n.t('activerecord.attributes.region.city_id', default: 'City')
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.region.name_#{locale}", default: "#{locale.upcase} Name")
      end
    end
    f.actions
  end

  show do
    attributes_table do
      row :city, label: I18n.t('activerecord.attributes.region.city_id', default: 'City')
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: I18n.t("activerecord.attributes.region.name_#{locale}", default: "#{locale.upcase} Name")
      end
      row :created_at, label: I18n.t("activerecord.attributes.region.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.region.updated_at", default: 'Updated At')
    end
  end
end
