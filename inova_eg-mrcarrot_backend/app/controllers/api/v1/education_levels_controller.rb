class Api::V1::EducationLevelsController < ApiController

    skip_before_action :authorize_request
    
    def list_education_levels
        education_levels = Applicant.education_levels.map{|label, value| {value: value, label: label}}
        return render json: {education_levels: education_levels}
    end
end