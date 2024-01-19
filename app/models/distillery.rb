# frozen_string_literal: true

class Distillery < ApplicationRecord
  include DistilleryConcern
  include Kaminari::PageScopeMethods

  scope :by_state, ->(state_abbrev) { where(state: state_abbrev) }

  def filtered_attributes
    attributes.except('id', 'created_at', 'updated_at')
  end
end
