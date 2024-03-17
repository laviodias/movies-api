FactoryBot.define do
  factory :movie do
    title { 'Movie' }
    director { 'John Doe' }
    user { create(:user) }
  end
end
