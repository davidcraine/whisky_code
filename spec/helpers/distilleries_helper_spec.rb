# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DistilleriesHelper, type: :helper do
  it 'should return state abbreviations' do
    expect(helper.state_options_for_select).to eq(DistilleriesHelper::STATE_ABBREVIATIONS.dup.prepend('All'))
  end
end
