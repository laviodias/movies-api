FactoryBot.define do
  factory :user do
    email { 'john@doe.com' }
    name { 'John Doe' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
