require 'rails_helper'

RSpec.describe Rating, type: :model do
  describe 'validations' do
    it 'is valid with a score and user_id' do
      rating = FactoryBot.create(:rating)
      expect(rating).to be_valid
    end

    it 'is invalid without a score' do
      rating = Rating.new(score: nil)
      rating.valid?
      expect(rating.errors[:score]).to include("can't be blank")
    end

    it 'is invalid without a user_id' do
      rating = Rating.new(user_id: nil)
      rating.valid?
      expect(rating.errors[:user_id]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      association = Rating.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'belongs to a movie' do
      association = Rating.reflect_on_association(:movie)
      expect(association.macro).to eq(:belongs_to)
    end
  end
end
