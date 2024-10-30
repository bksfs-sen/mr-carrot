# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    div class: "blank_slate_container", id: "dashboard_default_message" do
      span class: "blank_slate" do
        span I18n.t("active_admin.dashboard_welcome.welcome")
        small I18n.t("active_admin.dashboard_welcome.call_to_action")
      end
      br
      br
    end

    columns do
        column do
          panel "Number of Orders today" do
            Order.where(created_at: Date.today).count
          end
        end

        column do
          panel "Number of Purchases - Total amount" do
            #Order.where(created_at: Date.today).count
          end
        end

        column do
          panel "Number of New Users" do
            #Order.where(created_at: Date.today).count
          end
        end

        column do
          panel "Total number users" do
            User.all.count
          end
        end
    end

    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
  end # content
end
