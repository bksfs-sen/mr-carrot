class CreateDevices < ActiveRecord::Migration[6.1]
  def change
    create_table :devices do |t|
      t.references :authenticable, polymorphic: true, null: false
      t.string :uuid
      t.boolean :logged_out
      t.integer :locale
      t.text :fcm_token

      t.timestamps
    end
  end
end
