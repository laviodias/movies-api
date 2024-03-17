# Rating associations
class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  validates :score, presence: true
  validates :user_id, presence: true
  validates :movie_id, presence: true
end
