module DistilleriesConcern
  extend ActiveSupport::Concern

  class DistilleryFilter
    def initialize(distilleries)
      @distilleries = distilleries
    end

    def by_state(state_abbrev)
      @distilleries = @distilleries.by_state(state_abbrev) unless state_abbrev.blank? || state_abbrev == 'All'
      self
    end

    def like_owner(search_string)
      @distilleries = @distilleries.like_owner(search_string) unless search_string.blank?
      self
    end

    def result
      @distilleries
    end
  end
end
