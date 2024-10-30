ActiveAdmin.register Meal do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :admin_user_id, :description
  #
  # or
  #
  permit_params do
    permitted = [:admin_user_id]
    permitted << AVAILABLE_LOCALES.map{|locale| "description_#{locale}"}
    permitted
  end
filter :package
  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs do
      AVAILABLE_LOCALES.each do |locale|
        f.input "description_#{locale}", label: "#{I18n.t(locale)} Description", as: :text
      end
    end
    f.actions
  end

  index do
    selectable_column
    id_column
    column :admin_user
    AVAILABLE_LOCALES.each do |locale|
      column "description_#{locale}", label: "#{I18n.t(locale)} Description"
    end
    actions
  end

  csv do
    column :admin_user
    AVAILABLE_LOCALES.each do |locale|
      column "description_#{locale}", label: "#{I18n.t(locale)} Description"
    end
    column :created_at
    column :updated_at
  end

  show do |meal|
    attributes_table do
      row :admin_user
      AVAILABLE_LOCALES.each do |locale|
        row "description_#{locale}", label: "#{I18n.t(locale)} Description"
      end
    end
  end

  controller do

    def create
      @meal = Meal.new(permitted_params[:meal])
      @meal.admin_user = current_admin_user
      @meal.save!
      redirect_to admin_meals_path
    end
  end

end
