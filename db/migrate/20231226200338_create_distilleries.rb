# create initial distilleries table
class CreateDistilleries < ActiveRecord::Migration[7.2]
  def change
    create_table :distilleries do |t|
      t.string :owner_name, index: true
      t.string :operating_name, index: true
      t.string :permit_number
      t.string :street
      t.string :city
      t.string :state, index: true
      t.string :zip
      t.string :county
      t.timestamps
    end
  end
end
