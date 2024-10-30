class Api::V1::PaymentsController < ApiController
    skip_before_action :authorize_request    

    def create
        begin
            @payment = Payment.new(payment_params)
            raise ExceptionHandler::RecordSaveError unless @payment.save
            return json_response(Api::V1::PaymentSerializer.new(@payment).serializable_hash[:data][:attributes])
        rescue ExceptionHandler::RecordSaveError
            return json_response(@payment.errors.full_messages, :unprocessable_entity)
        end
    end

    private
    def payment_params
        params.require(:payment).permit(:payment_id, :status, :message, :order_id, :payment_type)
    end
end