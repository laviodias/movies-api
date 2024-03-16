class UserMoviesController < ApplicationController
  before_action :authenticate_user!

  def create
    user_movie = UserMovie.find_or_create_by(user: current_user, movie_id: params[:movie_id])

    if user_movie.update(score: params[:score])
      head :ok
    else
      head :bad_request
    end
  end
end
