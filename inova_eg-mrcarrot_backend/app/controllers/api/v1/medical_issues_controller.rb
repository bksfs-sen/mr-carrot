class Api::V1::MedicalIssuesController < ApiController

    skip_before_action :authorize_request
    
    def index
        @medical_issues = MedicalIssue.all
        return json_response(medical_issues: Api::V1::MedicalIssueSerializer.new(@medical_issues).serializable_hash[:data].map{ |medical_issue| medical_issue[:attributes]}, status: :ok)
    end
end