class Distillery < ApplicationRecord
include DistilleryConcern
include Kaminari::PageScopeMethods

  def filtered_attributes
    attributes.except('id', 'created_at', 'updated_at')
  end

end
