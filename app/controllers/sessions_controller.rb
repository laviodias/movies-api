# Handles user sessions
# Overwrites Devise SessionsController
class SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  private

  def respond_with(*resources, block)
    resources[0] = UserSerializer::Basic.new(current_user).serializable_hash
    super
  end

  def respond_to_on_destroy
    head :ok
  end
end
