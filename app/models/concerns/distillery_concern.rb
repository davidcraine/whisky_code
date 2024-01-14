module DistilleryConcern
  extend ActiveSupport::Concern

  def google_map_embed_link
    api_key = Rails.application.credentials.google_maps_api_key
    "https://www.google.com/maps/embed/v1/place?key=#{api_key}&q=#{google_map_address}"
  end

  # a pararameterize version of an addressed that can be passed to the google maps url
  def google_map_address
    attributes.slice('street', 'city', 'state', 'zip').values.join('+')
  end
end
