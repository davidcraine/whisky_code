# frozen_string_literal: true

class Distillery < ApplicationRecord
  include DistilleryConcern
  include Kaminari::PageScopeMethods
  geocoded_by :zip

  scope :by_state, ->(state_abbrev) { where(state: state_abbrev) }
  scope :like_owner, ->(search_string) { where("owner_name ILIKE ?", "%#{search_string}%") }

  def filtered_attributes
    attributes.except('id', 'created_at', 'updated_at')
  end

  # returrn the stored lat/long or fetch and update it if it's blank
  def coordinates!
    update(Hash[*%w[latitude longitude].zip(geocode).flatten]) if latitude.blank?
    [latitude, longitude]
  end
end
