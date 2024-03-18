require 'rails_helper'

RSpec.describe 'Ratings', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:movie) { FactoryBot.create(:movie, user: user) }

  before do
    sign_in user
  end

  describe 'POST /ratings' do
    it 'creates a rating' do
      post ratings_create_path, params: { movie_id: movie.id, score: 5 }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /ratings/create_from_csv' do
    it 'creates ratings from CSV' do
      file = fixture_file_upload('ratings.csv', 'text/csv')
      post ratings_create_from_csv_path, params: { file: file }

      expect(response).to have_http_status(:no_content)
    end
  end
end
