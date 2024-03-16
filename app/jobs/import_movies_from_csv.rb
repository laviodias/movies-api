# Job that creates new movies from a CSV file
class ImportMoviesFromCsv < ApplicationJob
  def perform(movies)
    movies.each do |movie|
      Movie.create(title: movie['title'], director: movie['director'])
    end
  end
end
