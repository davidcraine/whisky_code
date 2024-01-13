class Distillery < ApplicationRecord
include DistilleryConcern

  def filtered_attributes
    attributes.except('id', 'created_at', 'updated_at')
  end

end
