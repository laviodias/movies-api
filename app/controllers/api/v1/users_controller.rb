class Api::V1::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to movies_path
    else
      render :new
    end
    endclass MoviesController < ApplicationController
    before_action :authenticate_user!

    def index
      @movies = Movie.all
      respond_to do |format|
        format.html
        format.json { render json: @movies.to_json(methods: :average_score) }
      end
    end

    def new
      @movie = Movie.new
    end

    def create
      @movie = Movie.new(movie_params)
      if @movie.save
        redirect_to movies_path, notice: 'Movie was successfully created.'
      else
        render :new
      end
    end

    private

    def movie_params
      params.require(:movie).permit(:title, :director)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
