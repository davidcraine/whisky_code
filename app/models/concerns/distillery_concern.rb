module DistilleryConcern
  extend ActiveSupport::Concern

  # a pararameterize version of an addressed that can be passed to the google maps url
  def google_map_address
    attributes.slice('street', 'city', 'state', 'zip').values.join('+')
  end
end
