class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :title_en
      t.string :title_ar
      t.string :message_en
      t.string :message_ar
      t.integer :notification_type
      t.references :notifier, polymorphic: true, null: false
      t.string :data
      t.string :data_id
      t.boolean :need_action

      t.timestamps
    end
  end
end
