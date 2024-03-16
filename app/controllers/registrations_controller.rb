# Handles user registration and modification
# Overwrites Devise RegistrationsController
class RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  def create
    super
  end

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      resources[0] = UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      super
    else
      render json: {
        status: { message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[email password password_confirmation]
    )
  end

  def sign_up(_resource_name, _resource)
    true
  end
end
