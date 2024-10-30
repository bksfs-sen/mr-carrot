class Vacancy < ApplicationRecord
  belongs_to :sub_order

  validate :validates_vacancies_limit_per_month
  validate :validates_notice_period
  validate :validates_disable_vacancies_before_today


  def validates_vacancies_limit_per_month
    self.errors.add(:date, "You exceeded vacancies limit per month") if self.sub_order.vacancies.
      where(date: Date.parse(self.date)-1.month..Date.parse(self.date)).count >= 5
  end

  def validates_notice_period
    self.errors.add(:date, "You should apply for the vacation before it by minimum 3 days") if ((Date.parse(self.date)- Date.today).to_i) < 3
  end

  def validates_disable_vacancies_before_today
    self.errors.add(:date, "You should apply for future vacations") if (Date.parse(self.date)< Date.today)
  end
    def self.ransackable_attributes(auth_object = nil)
    ["created_at", "date", "id", "sub_order_id", "updated_at"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["sub_order"]
  end
end
