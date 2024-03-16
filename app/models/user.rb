class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :user_movies
  has_many :movies, through: :user_movies
end
