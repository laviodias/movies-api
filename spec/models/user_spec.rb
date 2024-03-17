require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with a name, email, and password' do
      user = FactoryBot.create(:user)
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = User.new(name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is invalid without an email' do
      user = User.new(email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is invalid without a password' do
      user = User.new(password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it 'is invalid with a duplicate email' do
      FactoryBot.create(:user)
      user = FactoryBot.build(:user)
      user.valid?
      expect(user.errors[:email]).to include('has already been taken')
    end

    it 'is invalid with a password less than 6 characters' do
      user = User.new(password: '12345')
      user.valid?
      expect(user.errors[:password]).to include('is too short (minimum is 6 characters)')
    end

    it 'is invalid with a password more than 128 characters' do
      user = User.new(password: 'a' * 129)
      user.valid?
      expect(user.errors[:password]).to include('is too long (maximum is 128 characters)')
    end

    it 'is invalid with an invalid email' do
      user = User.new(email: 'invalid_email')
      user.valid?
      expect(user.errors[:email]).to include('is invalid')
    end
  end

  describe 'associations' do
    it 'has many ratings' do
      association = User.reflect_on_association(:ratings)
      expect(association.macro).to eq(:has_many)
    end

    it 'has many movies' do
      association = User.reflect_on_association(:movies)
      expect(association.macro).to eq(:has_many)
    end
  end
end
