# References the movie's creator
class AddUserToMovies < ActiveRecord::Migration[7.1]
  def change
    change_table :movies do |t|
      t.references :user, null: false, foreign_key: true
    end
  end
end
