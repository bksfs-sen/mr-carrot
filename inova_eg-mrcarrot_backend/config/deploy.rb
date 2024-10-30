# I commented this line because I receive many errors when i add it
# require 'bundler/vlad'
# Require custom vlad tasks or recipes from vlad-extras
require 'vlad/maintenance'
# set :ssh_flags, '-p 666'
set :application, "MrCarrot"
set :repository, 'git@bitbucket.org:inova_eg/mrcarrot_backend.git'
set :domain, "deploy@3.72.189.188" # server development
set :revision, "origin/orders_APIs"
set :deploy_to, "~/mr_carrot"
set :keep_releases, 5

task :staging do
  set :domain, "deploy@3.72.189.188" # server staging
  set :revision, "origin/feature/payment_APIs" # branch must be created
  set :deploy_to, "~/mr_carrot"
  set :environment, "staging"
  set :port, 80
end

task :prod do
  set :domain, "deploy@3.126.10.183" # server production
  set :revision, "origin/feature/payment_APIs" # branch must be created
  set :deploy_to, "~/mr_carrot"
  set :environment, "production"
  set :port, 80
end

#
# Customize Vlad to our needs
#
namespace :vlad do
  # desc "Development Env"
  # task :dev => :app do
  # end
    desc "Start Thin server"
    remote_task :stop_thin => :app do
      if environment == "prod"
        run ". $HOME/.profile; cd #{current_path} && sudo service nginx stop"
        #run ". $HOME/.profile; cd #{current_path} && rvmsudo thin -p #{port} -P tmp/pids/thin.pid -l log/thin.log stop"
      else
        run ". $HOME/.profile; cd #{current_path} && sudo service nginx stop"
      end
    end
    remote_task :setup_files => :app do
run ". $HOME/.profile; cd #{current_path} && cp ~/setup_files/master.key config/master.key && cp ~/setup_files/credentials.yml.enc config/credentials.yml.enc && cp ~/setup_files/credentials.yml.enc config/credentials/production.yml.enc && cp ~/setup_files/master.key config/credentials/production.key"
      #  run ". $HOME/.profile; cd #{current_path} && cp ~/setup_files/master.key config/master.key && cp ~/setup_files/credentials.yml.enc config/credentials.yml.enc"
    end
    remote_task :setup_project => :app do
      run ". $HOME/.profile; cd #{current_path} && bundle install && RAILS_ENV=production rake db:migrate"
     # run ". $HOME/.profile; cd #{current_path} && bundle install && rake db:migrate"
    end
    desc "Change authorization of releases folder"
    remote_task :authorize_owner => :app do
      run ". $HOME/.profile; sudo chown -R deploy:deploy #{releases_path}"
    end
    remote_task :run_server => :app do
      # run ". $HOME/.profile; . ~/.startup_script.sh"
      if environment == "prod"
        run ". $HOME/.profile; cd #{current_path} && sudo service nginx start"
        #run ". $HOME/.profile; cd #{current_path} && rvmsudo thin -p #{port} -P tmp/pids/thin.pid -l log/thin.log start -d"
      else
        run ". $HOME/.profile; cd #{current_path} && sudo service nginx start"
      end
    end
  end
