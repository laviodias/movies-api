class MoviesController < ApplicationController
  require 'csv'
  before_action :authenticate_user!

  def index
    movies = Movie.all.order(created_at: :desc)
    render json: MovieSerializer::Summary.new(movies).serializable_hash
  end

  def show
    movie = Movie.find(params[:id]).includes(:ratings, :user)

    head :not_found if movie.nil?

    render json: MovieSerializer::Full.new(movie, params: { current_user: })
  end

  def create
    movie = Movie.new(movie_params)
    movie.user = current_user

    if movie.save
      head :ok
    else
      head :bad_request
    end
  end

  def find_by_user
    movies = Movie.where(user: current_user).order(created_at: :desc)
    render json: {
      movies: MovieSerializer::Extended.new(movies).serializable_hash,
      user_name: current_user.name
    }
  end

  def create_from_csv
    file = params[:file]

    movies = CSV.parse(file.read, headers: true).map(&:to_h)

    ImportMoviesFromCsv.perform_async(movies, current_user.id)
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :director)
  end
end
