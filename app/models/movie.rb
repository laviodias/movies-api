class Movie < ApplicationRecord
  has_many :user_movies
  has_many :users, through: :user_movies
  validates :title, presence: true, uniqueness: { scope: :director }

  def average_score
    user_movies.average(:score).to_f
  end
end
