Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  scope "(:locale)", locale: /en|ar/ do
    ActiveAdmin.routes(self)
  end

  devise_for :users


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :update, :show]
      resources :sessions, only: [:create, :destroy]
      resources :schools, only:[:index]
      resources :applicants, only: [:index, :create, :show, :update, :destroy]
      resources :system_configurations, only: [:create]
      resources :pre_registered_users, only: [:create]
      resources :orders, only: [:index, :create, :show] do
        collection do
          get ":keyword", to: "orders#index"
        end
      end

      resources :packages, only: [:index]
      resources :notifications, only: [:index]
      resources :official_vacations, only: [:index]
      resources :vacancies, only: [:create]
      resources :medical_issues, only: [:index]
      resources :payments, only: [:create]
      resources :reviews, only: [:create]
      post 'verify-user', to: 'verification#verify'
      post 'verify-user-firebase', to: 'verification#verify_with_firebase'
      put 'resend-confirmation-token', to: 'verification#resend_confirmation_token'
      get 'check-if-phone-exists', to: 'passwords#check_if_phone_exists'
      post 'check-verification', to: 'passwords#check_verification'
      put 'update-password', to: 'passwords#update_password'

      post "orders/:id/checkout", to: 'orders#checkout'
      get 'get-pending-order', to: 'orders#get_pending_order'

      post 'contact-us', to: 'contacts#create'

      get 'current-orders', to: 'orders#list_current_orders'
      get 'historical-orders', to: 'orders#list_historical_orders'

      post 'add-sub-order-to-order', to: 'orders#add_sub_order_to_order'
      put 'update-sub-order', to: 'orders#update_sub_order'
      delete 'remove-sub-order-from-order', to: 'orders#remove_sub_order_from_order'

      get 'education-levels', to: 'education_levels#list_education_levels'

    end
  end
  get 'neighborhoods/index'
  get 'regions/index'
end
