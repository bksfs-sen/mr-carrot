class CreateUserNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :user_notifications do |t|
      t.references :notification, null: false, foreign_key: true
      t.boolean :is_seen
      t.datetime :seen_time
      t.references :notified, polymorphic: true, null: false

      t.timestamps
    end
  end
end
