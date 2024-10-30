class Api::V1::ApplicantsController < ApiController


    def index
        paginated_results = custom_paginate(@current_user.applicants)
        response_json(
        status: :ok,
        data: { applicants: paginated_results[:paginated_collection].map { |record| record.as_json(options: detailed_view) }},
        extra: paginated_results[:pagination_info]
        )
    end
    def create
        begin
            ActiveRecord::Base.transaction do
                @applicant = Applicant.new(applicant_params[:main_attributes].merge(:user_id => @current_user.id))
                @applicant.build_address(applicant_params[:address])
                @applicant.assign_attributes(applicant_params[:medical_issues])
                raise ExceptionHandler::RecordSaveError unless @applicant.save
                return json_response(applicant: Api::V1::ApplicantSerializer.new(@applicant).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @applicant.errors.full_messages}, :unprocessable_entity)
        end
    end

    def show
        @applicant = Applicant.find_by(id: params[:id])
        return json_response(applicant: Api::V1::ApplicantSerializer.new(@applicant).serializable_hash[:data][:attributes], status: :ok)
    end

    def update
        begin
            ActiveRecord::Base.transaction do
                @applicant = Applicant.find_by(id: params[:id])
                raise Pundit::NotAuthorizedError unless @applicant.user_id == @current_user.id
                @applicant.address.update(applicant_params[:address]) if applicant_params[:address].present?
                raise ExceptionHandler::RecordSaveError unless @applicant.update(applicant_params[:main_attributes])
                @applicant.assign_attributes(applicant_params[:medical_issues]) if applicant_params[:medical_issues]
                return json_response(applicant: Api::V1::ApplicantSerializer.new(@applicant).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue Pundit::NotAuthorizedError
            return json_response({message: I18n.t('unauthorized')}, :unprocessable_entity)
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @applicant.errors.full_messages}, :unprocessable_entity)
        end
    end

    def destroy
        begin
            ActiveRecord::Base.transaction do
                @applicant = Applicant.find_by(id: params[:id])
                raise Pundit::NotAuthorizedError unless @applicant.user_id == @current_user.id
                raise ExceptionHandler::DeletionError unless @applicant.destroy
                return json_response(applicant: Api::V1::ApplicantSerializer.new(@applicant).serializable_hash[:data][:attributes], status: :ok)
            end
        rescue Pundit::NotAuthorizedError
            return json_response({message: I18n.t('unauthorized')}, :unprocessable_entity)
        rescue ExceptionHandler::DeletionError
            return json_response({message: @applicant.errors.full_messages}, :unprocessable_entity)
        end
    end

    private

    def applicant_params
        params.require(:applicant).permit(main_attributes: [:name, :school_id, :education_level, :medical_issue_description], address: [:region_id, :street_name, :building_name, :landmark, :lat, :long, :full_address], medical_issues: [medical_issue_ids: []])
    end
end
