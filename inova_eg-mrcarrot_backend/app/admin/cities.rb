ActiveAdmin.register City do
  # Correctly handle the menu translation
  menu parent: I18n.t('activerecord.menu.lookup', default: 'Lookups').to_s

  # Permitted parameters including translated fields
  permit_params do
    permitted = [:country_id]
    permitted += AVAILABLE_LOCALES.map { |locale| "name_#{locale}".to_sym }
    permitted
  end

  filter :country
      filter :name_cont, label: "Name"

  index do
    selectable_column
    id_column
    column :country
    AVAILABLE_LOCALES.each do |locale|
      column I18n.t("activerecord.attributes.city.name_#{locale}", default: "Name (#{locale.upcase})") do |city|
        city.send("name_#{locale}")
      end
    end
    actions
  end

  # CSV export configuration
  csv do
    column :country
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: I18n.t("activerecord.attributes.city.name_#{locale}", default: "#{locale.upcase} Name")
    end
    column :created_at, label: I18n.t("activerecord.attributes.city.created_at", default: 'Created At')
    column :updated_at, label: I18n.t("activerecord.attributes.city.updated_at", default: 'Updated At')
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      f.input :country, label: I18n.t("activerecord.attributes.city.country_id")
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: I18n.t("activerecord.attributes.city.name_#{locale}", default: "#{locale.upcase} Name")
      end
    end
    f.actions
  end

  show do |city|
    attributes_table do
      row :country, label: I18n.t("activerecord.attributes.city.country_id")
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: I18n.t("activerecord.attributes.city.name_#{locale}", default: "#{locale.upcase} Name")
      end
      row :created_at, label: I18n.t("activerecord.attributes.city.created_at", default: 'Created At')
      row :updated_at, label: I18n.t("activerecord.attributes.city.updated_at", default: 'Updated At')
    end
  end
end
