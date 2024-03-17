# Job that creates new movies from a CSV file
class ImportMoviesFromCsv < ApplicationJob
  def perform(movies, user_id)
    movies.each do |movie|
      Movie.create(title: movie['title'], director: movie['director'], user_id:)
    end
  end
end
