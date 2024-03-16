REDIS_CONFIG = { url: 'redis://localhost:6379/0' }.freeze

Sidekiq.configure_server do |config|
  config.redis = REDIS_CONFIG
  config.logger = Sidekiq::Logger.new(Rails.root.join('log/sidekiq.log'))
  config.logger.formatter = Sidekiq::Logger::Formatters::Pretty.new
end

Sidekiq.configure_client do |config|
  config.redis = REDIS_CONFIG
end
