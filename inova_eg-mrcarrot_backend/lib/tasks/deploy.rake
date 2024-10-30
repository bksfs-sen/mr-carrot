namespace :deploy do

  desc "TODO"

  task deploy: :environment do

       puts 'MRCarrot: Update Project 1'
      Rake::Task["vlad:stop_thin"].invoke
       puts 'MRCarrot: Update Project 2'
      Rake::Task["vlad:update"].invoke
       puts 'MRCarrot: Update Project 3'
      Rake::Task["vlad:setup_files"].invoke
       puts 'MRCarrot: Update Project 4'

      Rake::Task["vlad:setup_project"].invoke
             puts 'MRCarrot: Update Project 5'

      Rake::Task["vlad:run_server"].invoke
             puts 'MRCarrot: Update Project 6'

      Rake::Task["vlad:authorize_owner"].invoke
             puts 'MRCarrot: Update Project 7'

      Rake::Task["vlad:cleanup"].invoke
  end
end

