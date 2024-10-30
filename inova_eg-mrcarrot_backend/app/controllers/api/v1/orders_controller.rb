class Api::V1::OrdersController < ApiController

    def index
        keyword = params[:keyword]
        raise ExceptionHandler::InvalidParameters.new(error: "invalid_params") unless ["pending","current", "historical"].include? keyword.downcase
        paginated_results = custom_paginate(@current_user.orders.send(keyword.downcase.to_sym))
        response_json(
        status: :ok,
        data: { orders: paginated_results[:paginated_collection].map { |record| record.as_json(options: detailed_view) }},
        extra: paginated_results[:pagination_info]
        )
    end

    def get_pending_order
            @pending_order = @current_user.orders.find_by(subscription_status: "pending")
            return json_response({message: I18n.t("no_pending_orders")}, :ok) unless @pending_order.present?
            return json_response(order: Api::V1::OrderSerializer.new(@pending_order).serializable_hash[:data][:attributes], status: :ok)
    end

    def create
        begin
            ActiveRecord::Base.transaction do
                @order = Order.pending.find_or_initialize_by(user_id: @current_user.id)
                if @order.package_id != order_params[:package_id]
                    raise ExceptionHandler::RecordSaveError unless @order.update(package_id: order_params[:package_id])
                end
                return json_response(order: Api::V1::OrderSerializer.new(@order).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @order.errors.full_messages}, :unprocessable_entity)
        end
    end

    def show
        begin
            @order = Order.find_by(id: params[:id])
            raise ActiveRecord::RecordNotFound unless @order.present?
            return json_response(order: Api::V1::OrderSerializer.new(@order).serializable_hash[:data][:attributes], status: :ok) if @order.present?
        rescue ActiveRecord::RecordNotFound
            return json_response({message: I18n.t("not_found")}, :unprocessable_entity)
        end
    end

    def add_sub_order_to_order
        begin
            @order = Order.find_by(id: sub_order_params[:order_id])
            @sub_order = @order.sub_orders.build(sub_order_params)
            raise ExceptionHandler::RecordSaveError unless @order.save
            return json_response(sub_order: Api::V1::SubOrderSerializer.new(@sub_order).serializable_hash[:data][:attributes], status: :ok)
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @sub_order.errors.full_messages}, :unprocessable_entity)
        end
    end

    def update_sub_order
        begin
            @sub_order = SubOrder.find_by(id: update_sub_order_params[:sub_order_id])
            raise ExceptionHandler::RecordSaveError unless @sub_order.update(start_date: update_sub_order_params[:start_date],
                 num_of_months: update_sub_order_params[:num_of_months])
                 return json_response(order: Api::V1::OrderSerializer.new(@sub_order.order).serializable_hash[:data][:attributes], status: :ok)
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @sub_order.errors.full_messages}, :unprocessable_entity)
        end
    end

    def remove_sub_order_from_order
        begin
            @sub_order = SubOrder.find_by(id: params[:sub_order_id])
            raise ExceptionHandler::DeletionError unless @sub_order.destroy
            return json_response(order: Api::V1::OrderSerializer.new(@sub_order.order).serializable_hash[:data][:attributes], status: :ok)
        rescue ExceptionHandler::DeletionError
            return json_response({message: @sub_order.errors.full_messages}, :unprocessable_entity)
        end
    end

    def list_current_orders
        @current_orders = SubOrder.current_sub_orders(@current_user)
        return json_response(orders: Api::V1::SubOrderSerializer.new(@current_orders).serializable_hash[:data].map{|order| order[:attributes]}, status: :ok)
    end

    def list_historical_orders
        @historical_orders = SubOrder.historical_sub_orders(@current_user)
        return json_response(orders: Api::V1::SubOrderSerializer.new(@historical_orders).serializable_hash[:data].map{|order| order[:attributes]}, status: :ok)
    end

    def checkout
        begin
            @order = Order.find_by(id: params[:id])
            raise Pundit::NotAuthorizedError unless @order.user_id == @current_user.id
            raise ExceptionHandler::RecordSaveError unless @order.update(subscription_status: "done")
            return json_response(order: Api::V1::OrderSerializer.new(@order).serializable_hash[:data][:attributes], status: :ok)
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @order.errors.full_messages}, :unprocessable_entity)
        rescue Pundit::NotAuthorizedError
            return json_response({message: I18n.t("not_authorized")}, :unprocessable_entity)
        end
    end

    private
    def order_params
        params.require(:order).permit(:package_id)
    end

    def sub_order_params
        params.require(:sub_order).permit(:order_id, :applicant_id, :start_date, :num_of_months)
    end

    def update_sub_order_params
        params.require(:sub_order).permit(:sub_order_id, :start_date, :num_of_months)
    end
end
