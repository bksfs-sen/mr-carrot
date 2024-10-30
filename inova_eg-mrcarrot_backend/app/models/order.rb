class Order < ApplicationRecord
  belongs_to :user
  belongs_to :package
  has_many :sub_orders, dependent: :destroy
  has_many :applicants, through: :sub_orders

  #scope :where_medical_issue,
  # -> (medical_issue_id) {
  #    applicants_ids = ApplicantMedicalIssue.where(medical_issue_id: medical_issue_id).pluck(:applicant_id)
  #    orders = Order.where(id: SubOrder.where(applicant_id: applicants_ids).pluck(:order_id).uniq)
  #  }
  #scope :order_applicants_ids, {where}
  scope :current, -> { where(subscription_status: :current) }
  scope :historical, -> { where(subscription_status: :done)  }

  enum subscription_status: {pending: 0, done: 1, cancelled: 2, current:3 }, _default: :pending

  after_update :set_suborders_expiration_status, if: Proc.new{saved_change_to_subscription_status? && self.subscription_status == "done"}

  def set_suborders_expiration_status
    self.sub_orders.update_all(expiration_status: "current")
  end

  def self.ransackable_scopes(_auth_object = nil)
    %i(where_medical_issue where_region)
  end

  def self.where_medical_issue(medical_issue_id)
    applicant_ids = ApplicantMedicalIssue.where(medical_issue_id: medical_issue_id).pluck(:applicant_id)
    orders = Order.joins(:sub_orders).where("sub_orders.applicant_id IN (?)", applicant_ids)
  end

  def self.where_region(region_id)
    region_id = 1 if region_id.instance_of? TrueClass
    school_applicant_ids = School.joins("JOIN addresses ON schools.id=addresses.addressable_id AND addresses.addressable_type = 'School' AND addresses.region_id=#{region_id}")
                                  .joins(:applicants).select("applicants.*").pluck(:id)
    applicant_ids = school_applicant_ids +
                    Applicant.joins("JOIN addresses ON applicants.id=addresses.addressable_id AND addresses.addressable_type = 'Applicant' AND addresses.region_id=#{region_id}").pluck(:id)
    orders = Order.joins(:sub_orders).where("sub_orders.applicant_id IN (?)", applicant_ids)
  end

  def get_amount(with_vat = false)
    amount = 0
    self.sub_orders.each do |sub_order|
      amount += sub_order.num_of_months*self.package.price
    end
    with_vat ? (amount + amount*VAT_PERCENTAGE) : amount
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "package_id", "subscription_status", "updated_at", "user_id"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["applicants", "package", "sub_orders", "user"]
  end
end
