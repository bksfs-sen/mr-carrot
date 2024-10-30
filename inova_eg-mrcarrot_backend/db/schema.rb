# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_10_06_024557) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.bigint "region_id", null: false
    t.string "street_name"
    t.string "building_name"
    t.string "landmark"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "lat"
    t.string "long"
    t.text "full_address"
    t.bigint "neighborhood_id"
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
    t.index ["neighborhood_id"], name: "index_addresses_on_neighborhood_id"
    t.index ["region_id"], name: "index_addresses_on_region_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "admin_user_type"
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "applicant_medical_issues", force: :cascade do |t|
    t.bigint "applicant_id", null: false
    t.bigint "medical_issue_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["applicant_id"], name: "index_applicant_medical_issues_on_applicant_id"
    t.index ["medical_issue_id"], name: "index_applicant_medical_issues_on_medical_issue_id"
  end

  create_table "applicants", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "school_id", null: false
    t.string "name"
    t.integer "education_level"
    t.text "medical_issue_description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_id"], name: "index_applicants_on_school_id"
    t.index ["user_id"], name: "index_applicants_on_user_id"
  end

  create_table "cities", force: :cascade do |t|
    t.bigint "country_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_cities_on_country_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "devices", force: :cascade do |t|
    t.string "authenticable_type", null: false
    t.bigint "authenticable_id", null: false
    t.string "uuid"
    t.boolean "logged_out"
    t.integer "locale"
    t.text "fcm_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["authenticable_type", "authenticable_id"], name: "index_devices_on_authenticable"
  end

  create_table "meals", force: :cascade do |t|
    t.bigint "admin_user_id", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["admin_user_id"], name: "index_meals_on_admin_user_id"
  end

  create_table "medical_issues", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "mobility_string_translations", force: :cascade do |t|
    t.string "locale", null: false
    t.string "key", null: false
    t.string "value"
    t.string "translatable_type"
    t.bigint "translatable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["translatable_id", "translatable_type", "key"], name: "index_mobility_string_translations_on_translatable_attribute"
    t.index ["translatable_id", "translatable_type", "locale", "key"], name: "index_mobility_string_translations_on_keys", unique: true
    t.index ["translatable_type", "key", "value", "locale"], name: "index_mobility_string_translations_on_query_keys"
  end

  create_table "mobility_text_translations", force: :cascade do |t|
    t.string "locale", null: false
    t.string "key", null: false
    t.text "value"
    t.string "translatable_type"
    t.bigint "translatable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["translatable_id", "translatable_type", "key"], name: "index_mobility_text_translations_on_translatable_attribute"
    t.index ["translatable_id", "translatable_type", "locale", "key"], name: "index_mobility_text_translations_on_keys", unique: true
  end

  create_table "neighborhoods", force: :cascade do |t|
    t.bigint "region_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["region_id"], name: "index_neighborhoods_on_region_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "title_en"
    t.string "title_ar"
    t.string "message_en"
    t.string "message_ar"
    t.integer "notification_type"
    t.string "notifier_type", null: false
    t.bigint "notifier_id", null: false
    t.string "data"
    t.string "data_id"
    t.boolean "need_action"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notifier_type", "notifier_id"], name: "index_notifications_on_notifier"
  end

  create_table "official_vacations", force: :cascade do |t|
    t.bigint "country_id", null: false
    t.string "name"
    t.string "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_official_vacations_on_country_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "package_id", null: false
    t.integer "subscription_status"
    t.index ["package_id"], name: "index_orders_on_package_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "package_meals", force: :cascade do |t|
    t.bigint "package_id", null: false
    t.bigint "meal_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["meal_id"], name: "index_package_meals_on_meal_id"
    t.index ["package_id"], name: "index_package_meals_on_package_id"
  end

  create_table "packages", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.bigint "country_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "rate"
    t.string "image_url"
    t.index ["country_id"], name: "index_packages_on_country_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.string "payment_id"
    t.integer "status"
    t.string "message"
    t.integer "payment_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_payments_on_order_id"
  end

  create_table "pre_registered_users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "phone_number"
  end

  create_table "regions", force: :cascade do |t|
    t.bigint "city_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_regions_on_city_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "description"
    t.integer "rate"
    t.bigint "sub_order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["sub_order_id"], name: "index_reviews_on_sub_order_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sub_orders", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "applicant_id", null: false
    t.integer "num_of_months"
    t.string "start_date"
    t.integer "expiration_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["applicant_id"], name: "index_sub_orders_on_applicant_id"
    t.index ["order_id"], name: "index_sub_orders_on_order_id"
  end

  create_table "user_notifications", force: :cascade do |t|
    t.bigint "notification_id", null: false
    t.boolean "is_seen"
    t.datetime "seen_time"
    t.string "notified_type", null: false
    t.bigint "notified_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notification_id"], name: "index_user_notifications_on_notification_id"
    t.index ["notified_type", "notified_id"], name: "index_user_notifications_on_notified"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "unconfirmed_mobile_number"
    t.string "mobile_number"
    t.boolean "is_verified"
    t.boolean "notifications_enabled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmation_sent_at"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "vacancies", force: :cascade do |t|
    t.bigint "sub_order_id", null: false
    t.string "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["sub_order_id"], name: "index_vacancies_on_sub_order_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "neighborhoods"
  add_foreign_key "addresses", "regions"
  add_foreign_key "applicant_medical_issues", "applicants"
  add_foreign_key "applicant_medical_issues", "medical_issues"
  add_foreign_key "applicants", "schools"
  add_foreign_key "applicants", "users"
  add_foreign_key "cities", "countries"
  add_foreign_key "meals", "admin_users"
  add_foreign_key "neighborhoods", "regions"
  add_foreign_key "official_vacations", "countries"
  add_foreign_key "orders", "packages"
  add_foreign_key "orders", "users"
  add_foreign_key "package_meals", "meals"
  add_foreign_key "package_meals", "packages"
  add_foreign_key "packages", "countries"
  add_foreign_key "payments", "orders"
  add_foreign_key "regions", "cities"
  add_foreign_key "reviews", "sub_orders"
  add_foreign_key "reviews", "users"
  add_foreign_key "sub_orders", "applicants"
  add_foreign_key "sub_orders", "orders"
  add_foreign_key "user_notifications", "notifications"
  add_foreign_key "vacancies", "sub_orders"
end
