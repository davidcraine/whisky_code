require 'rails_helper'

RSpec.describe Distillery, type: :model do
  describe '#filtered_attributes' do
    it 'should return all attibutes except id, created_at, and updated_at' do
      distillery = create :distillery
      expected_result = distillery.attributes.except('id', 'created_at', 'updated_at')
      expect(distillery.filtered_attributes).to eq(expected_result)
    end
  end
end
