module Api::V1::AmazonS3

    def set_file (parameters)
        unless parameters[:file].blank?
          bucket = Aws::S3::Resource.new.bucket(Rails.application.credentials.dig(:s3, :bucket_name))
          fileUp = parameters[:file]
          @s3_direct_post = bucket.object("uploads/#{SecureRandom.uuid}/#{fileUp}")
          @s3_direct_post.upload_file(parameters[:temp_file], acl: 'public-read')
          @url = @s3_direct_post.public_url
        end
    end
end