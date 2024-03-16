class ApplicationJob
  include Sidekiq::Job
  queue_as :default
end
