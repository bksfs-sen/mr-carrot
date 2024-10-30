module GeneralHelper
  extend ActiveSupport::Concern
  def as_json(options: {})
    ( "Api::V1::" + self.class.name + "Serializer").constantize.new(self, options).serializable_hash[:data][:attributes]
  end
end
