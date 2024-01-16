class CreateDistilleries < ActiveRecord::Migration[7.2]
  def change
    create_table :distilleries do |t|
      t.string :owner_name
      t.string :operating_name
      t.string :permit_number
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
      t.string :county
      t.timestamps
    end
  end
end
