module Api::V1::Response

    def json_response(object, status = :ok)
        return render json: object, status: status, content_type: 'application/json'
    end

end
