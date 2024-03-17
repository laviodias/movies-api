FactoryBot.define do
  factory :rating do
    score { 5 }
    movie { create(:movie) }
    user { User.first || create(:user) }
  end
end
