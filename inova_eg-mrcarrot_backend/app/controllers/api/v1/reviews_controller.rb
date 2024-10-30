class Api::V1::ReviewsController < ApiController

    def create
        begin
            @review = Review.new(review_params.merge(user_id: @current_user.id))
            raise ExceptionHandler::RecordSaveError unless @review.save
            return json_response(Api::V1::ReviewSerializer.new(@review).serializable_hash[:data][:attributes])
        rescue ExceptionHandler::RecordSaveError
            return json_response(@review.errors.full_messages, :unprocessable_entity)
        end
    end

    private
    def review_params
        params.require(:review).permit(:sub_order_id, :description, :rate)
    end
    
end