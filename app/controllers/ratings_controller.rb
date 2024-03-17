class RatingsController < ApplicationController
  before_action :authenticate_user!

  def create
    rating = Rating.find_or_create_by(user: current_user, movie_id: params[:movie_id])

    if rating.update(score: params[:score])
      head :ok
    else
      head :bad_request
    end
  end

  def create_from_csv
    file = params[:file]

    scores = CSV.parse(file.read, headers: true).map(&:to_h)

    ImportRatingsFromCsv.perform_async(scores, current_user.id)
  end
end
