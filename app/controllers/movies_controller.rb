class MoviesController < ApplicationController
  require 'csv'
  before_action :authenticate_user!

  def index
    movies = Movie.all
    render json: movies.to_json(methods: :average_score)
  end

  def show
    movie = Movie.find(params[:id])

    head :not_found if movie.nil?

    user_score = UserMovie.find_by(user: current_user, movie:)&.score

    render json: {
      **movie.as_json,
      average_score: movie.average_score,
      user_score:
    }
  end

  def create
    movie = Movie.new(movie_params)

    if movie.save
      head :ok
    else
      head :bad_request
    end
  end

  def create_from_csv
    file = params[:file]

    movies = CSV.parse(file.read, headers: true).map(&:to_h)

    ImportMoviesFromCsv.perform_async(movies)
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :director)
  end
end
