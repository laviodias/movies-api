require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe 'validations' do
    it 'is valid with a title, director, and user_id' do
      user = FactoryBot.create(:user)
      movie = FactoryBot.create(:movie, user:)
      expect(movie).to be_valid
    end

    it 'is invalid without a title' do
      movie = Movie.new(title: nil)
      movie.valid?
      expect(movie.errors[:title]).to include("can't be blank")
    end

    it 'is invalid without a director' do
      movie = Movie.new(director: nil)
      movie.valid?
      expect(movie.errors[:director]).to include("can't be blank")
    end

    it 'is invalid without a user_id' do
      movie = Movie.new(user_id: nil)
      movie.valid?
      expect(movie.errors[:user_id]).to include("can't be blank")
    end

    it 'is invalid with a duplicate title and director' do
      user = FactoryBot.create(:user)
      FactoryBot.create(:movie, user:)
      movie = FactoryBot.build(:movie, user:)
      movie.valid?
      expect(movie.errors[:title]).to include('has already been taken')
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      association = Movie.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'has many ratings' do
      association = Movie.reflect_on_association(:ratings)
      expect(association.macro).to eq(:has_many)
    end

    it 'deletes associated ratings' do
      user = FactoryBot.create(:user)
      movie = FactoryBot.create(:movie, user:)
      FactoryBot.create(:rating, movie:, user:)
      expect { movie.destroy }.to change(Rating, :count).by(-1)
    end
  end

  describe 'average_score' do
    it 'returns the average score of all ratings' do
      user = FactoryBot.create(:user)
      movie = FactoryBot.create(:movie, user:)
      FactoryBot.create(:rating, movie:, user:, score: 5)
      FactoryBot.create(:rating, movie:, user:, score: 3)
      expect(movie.average_score).to eq(4)
    end
  end

  describe 'rating_count' do
    it 'returns the number of ratings' do
      user = FactoryBot.create(:user)
      movie = FactoryBot.create(:movie, user:)
      FactoryBot.create(:rating, movie:, user:, score: 5)
      FactoryBot.create(:rating, movie:, user:, score: 3)
      expect(movie.rating_count).to eq(2)
    end
  end
end
