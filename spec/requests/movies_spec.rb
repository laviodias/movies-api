require 'rails_helper'

RSpec.describe 'Movies', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:movie) { FactoryBot.create(:movie, user:) }

  before do
    sign_in user
  end

  describe 'GET /movies' do
    it 'returns a list of movies' do
      get movies_index_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /movies/:id' do
    it 'returns a movie' do
      get movies_show_path(movie)
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(movie.title)
    end
  end

  describe 'POST /movies' do
    it 'creates a movie' do
      post movies_create_path, params: { movie: FactoryBot.attributes_for(:movie, user:) }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /movies/find_by_user' do
    it 'returns a list of movies by user' do
      get movies_find_by_user_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /movies/create_from_csv' do
    it 'creates movies from CSV' do
      file = fixture_file_upload('movies.csv', 'text/csv')
      post movies_create_from_csv_path, params: { file: file }

      expect(response).to have_http_status(:no_content)
    end
  end
end
