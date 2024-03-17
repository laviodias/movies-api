# Handles user registration and modification
# Overwrites Devise RegistrationsController
class RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  def create
    build_resource(sign_up_params)

    resource.save

    sign_up(resource_name, resource)

    if resource.persisted? && resource.active_for_authentication?
      sign_in(resource_name, resource)
    else
      clean_up_passwords resource
      set_minimum_password_length
      render json: {
        status: 500,
        message: resource.errors.full_messages
      }, status: :internal_server_error
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[name email password password_confirmation]
    )
  end

  def sign_up(_resource_name, _resource)
    true
  end
end
