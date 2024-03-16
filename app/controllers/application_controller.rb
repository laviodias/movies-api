# Main controller file. Other controllers inherit this.
class ApplicationController < ActionController::API
  protected

  def authenticate_user!
    if user_signed_in?
      super
    else
      render status: :unauthorized
    end
  end
end
