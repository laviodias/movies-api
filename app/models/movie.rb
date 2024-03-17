class Movie < ApplicationRecord
  belongs_to :user
  has_many :ratings, dependent: :destroy
  validates :title, presence: true, uniqueness: { scope: :director }

  def average_score
    ratings&.average(:score)&.to_i
  end

  def rating_count
    ratings&.count
  end
end
