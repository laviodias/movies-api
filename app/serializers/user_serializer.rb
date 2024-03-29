module UserSerializer
  # Default serializer, only contains more freely accessible columns.
  # More useful for non-admin users.
  class Basic
    include Alba::Resource

    attributes :id,
               :name,
               :email
  end

  # Extends the basic serializer and adds the other columns
  class Extended < Basic
  end

  # Might include stats, associations and columns to summarize multiple information
  class Summary < Extended
  end

  # Contains all information required for a detailed view of the object
  class Full < Extended
  end
end
