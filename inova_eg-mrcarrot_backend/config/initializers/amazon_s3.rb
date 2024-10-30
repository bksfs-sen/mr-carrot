Aws.config.update({
    region: Rails.application.credentials.dig(:s3, :region),
    credentials: Aws::Credentials.new(Rails.application.credentials.dig(:s3, :access_key), Rails.application.credentials.dig(:s3, :secret_key))})