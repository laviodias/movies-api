# Rating associations
class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie
end