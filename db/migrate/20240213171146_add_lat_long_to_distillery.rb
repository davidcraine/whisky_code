class AddLatLongToDistillery < ActiveRecord::Migration[7.2]
  def change
    add_column :distilleries, :latitude, :float
    add_column :distilleries, :longitude, :float
    add_index :distilleries, %i[latitude longitude]
  end
end
