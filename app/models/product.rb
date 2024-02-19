class Product < ApplicationRecord
  belongs_to :distillery
  has_rich_text :description

  has_many :comments, as: :commentable
end
