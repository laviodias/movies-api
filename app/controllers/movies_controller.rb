class MoviesController < ApplicationController
  require 'csv'
  before_action :authenticate_user!

  def index
    @movies = Movie.all
    render json: @movies.to_json(methods: :average_score)
  end

  def show
    @movie = Movie.find(params[:id])
    render json: @movie.to_json(methods: :average_score)
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      head :ok
    else
      head :bad_request
    end
  end

  def update
    @movie = Movie.find(params[:id])
    if @movie.update(movie_params)
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
