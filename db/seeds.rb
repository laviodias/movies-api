# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create(name: 'Admin', email: 'admin@rotten', password: 'admin')

Movie.destroy_all

# Creates 20 movies
20.times do
  Movie.create(
    title: Faker::Movie.title,
    director: Faker::Name.name,
    user_id: User.first.id
  )
end

# Creates 3 ratings
3.times do |i|
  Rating.create(
    movie_id: (i + 1),
    user_id: User.first.id,
    score: rand(1..5)
  )
end
