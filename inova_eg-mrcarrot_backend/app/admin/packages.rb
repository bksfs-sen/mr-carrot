ActiveAdmin.register Package do


  permit_params do
    permitted = [:price, :country_id, :image_url, package_meals_attributes: [:id, :package_id, :meal_id, :_create, :_update, :_destroy]]
    permitted << AVAILABLE_LOCALES.map{|locale| "name_#{locale}"}
    permitted
  end

  index do
    selectable_column
    id_column
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: "#{I18n.t(locale)} Name"
    end
    column :price
    column :country
    column :image_url do |package|
      image_tag package&.image_url, class: 'index_image_size'
    end
    actions
  end

  csv do
    AVAILABLE_LOCALES.each do |locale|
      column "name_#{locale}", label: "#{I18n.t(locale)} Name"
    end
    column :price
    column :country
    column :created_at
    column :updated_at
  end

  form do |f|
    f.inputs do
      AVAILABLE_LOCALES.each do |locale|
        f.input "name_#{locale}", label: "#{I18n.t(locale)} Name"
      end
      f.input :price
      f.input :country, :collection => Country.all
      f.input :image_url, as: :file, hint: f.object.image_url
      f.inputs "Meals" do
        f.has_many :package_meals, :allow_destroy => true do |t|
          t.input :meal, :collection => Meal.all.map{|meal| [meal.description, meal.id]}
        end
      end
    end
    f.actions
  end

  show do
    attributes_table do
      AVAILABLE_LOCALES.each do |locale|
        row "name_#{locale}", label: "#{I18n.t(locale)} Name"
      end
      row :price
      row :country
      row :image do |package|
        image_tag package&.image_url, class: 'show_image_size'
      end
    end
    panel "Meals" do
      table_for package.package_meals do |object|
        column :meal_id do |package_meal|
          Meal.find_by(id: package_meal.meal_id).description
        end
        column "actions" do |object|
          links = ''.html_safe
          links += link_to I18n.t('active_admin.delete'), admin_package_meal_path(id: object.id), :method => :delete, :class => "member_link delete_link"
        end
      end
    end

  end

  controller do
    before_action :upload_image, only: [:create, :update]

    def upload_image
      if params[:package][:image_url].present?
        img_url = params[:package][:image_url]
        original_filename = img_url.original_filename
        temp_file = img_url.tempfile
        file_url = set_file({file: original_filename, temp_file: temp_file})
        params[:package][:image_url] = file_url
      end
    end

  end

end
