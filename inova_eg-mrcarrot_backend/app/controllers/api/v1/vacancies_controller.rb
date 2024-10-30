class Api::V1::VacanciesController < ApiController

    def create
        begin
            ActiveRecord::Base.transaction do
                dates = vacancy_params[:dates].split(/\s*,\s*/)
                dates.each do |date|
                    @vacancy = Vacancy.find_or_initialize_by(sub_order_id: vacancy_params[:sub_order_id], date: date)
                    raise ExceptionHandler::RecordSaveError unless @vacancy.save
                end
                return json_response({message: I18n.t('success')}, :ok)
            end
        rescue ExceptionHandler::RecordSaveError
            return json_response({message: @vacancy.errors.full_messages}, :unprocessable_entity)
        end
    end

    private
    def vacancy_params
        params.require(:vacancies).permit(:sub_order_id, :dates)
    end
end