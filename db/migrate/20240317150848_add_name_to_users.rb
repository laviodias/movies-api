# Adds a name column to the users table
class AddNameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string, null: false, default: ''
  end
end
