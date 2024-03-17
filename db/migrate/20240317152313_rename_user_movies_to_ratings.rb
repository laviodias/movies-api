# Renames the user_movies table to ratings as it's a more accurate name for the table's purpose
class RenameUserMoviesToRatings < ActiveRecord::Migration[7.1]
  def change
    rename_table :user_movies, :ratings
  end
end
