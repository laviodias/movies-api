# Job that creates new user ratings from a CSV file
class ImportRatingsFromCsv < ApplicationJob
  def perform(scores, user_id)
    scores.each do |score|
      UserMovie.create_or_find_by(user_id:, movie_id: score['id']).update(score: score['score'])
    end
  end
end
