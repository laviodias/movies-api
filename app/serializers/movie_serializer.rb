module MovieSerializer
  # Default serializer, only contains more freely accessible columns.
  # More useful for non-admin users.
  class Basic
    include Alba::Resource

    attributes :id, :title, :director
  end

  # Extends the basic serializer and adds the other columns
  class Extended < Basic
    attributes :average_score, :rating_count

    attribute :created_at do |movie|
      movie.created_at.strftime('%d/%m/%Y')
    end
  end

  # Might include stats, associations and columns to summarize multiple information
  class Summary < Extended
    attribute :creator do |movie|
      movie.user.name
    end
  end

  # Contains all information required for a detailed view of the object
  class Full < Extended
    attribute :user_score do |movie|
      movie.ratings.find_by(user: params[:current_user])&.score
    end
  end
end
