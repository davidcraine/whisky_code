class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.references :distillery, index: true
      t.string :name, null: false, index: true
      t.integer :rating

      t.timestamps
    end
  end
end
