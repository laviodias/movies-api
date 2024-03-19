# README

## Movies API

This project is a web system that allows users to rate movies.

It was created using `Ruby on Rails` and `ReactJS` following the rules of [this repo](https://github.com/oxeanbits/literate-garbanzo).

Both frontend and backend applications are on the same project, so no need to clone another repository.

To run this locally, you'll need:
```
ruby-3.1.4
npm or yarn (to run the ReactJS application)
sqlite3
redis (for sidekiq gem)
```

Now that you have all the requirements, follow these steps:

- Clone this repo to your machine:
```git clone git@github.com:laviodias/movies-api.git``` if you use SSH
or ```https://github.com/laviodias/movies-api.git``` if you prefer to use HTTPS.

- Create a new file `/config/master.key` and set it value to `f5183ecff405d40564531261ab30c014`.

- On the root folder, run:
```ruby
bundle install
rails db:migrate
rails db:seed
```
If you prefer an empty database, don't run the last command.

- To get the application working perfectly, you'll need to run:
```ruby
rails s
```

- Then, open another terminal to get sidekiq up and running:
```ruby
bundle exec sidekiq -C ./config/sidekiq.yml 
```
This command is not mandatory unless you want the jobs running (CSV imports)

- Finally, to run the frontend, open another terminal and run:
```
cd client
npm install
npm run dev
```

That's all. Now your server should be running on port `3000` and your client on port `5173`.

If you ran the seed from the step 2, you already have an account that can be used: 
email: `admin@rotten`
password: `admin`

You can create new users if you prefer.

You also should have 20 movies, 3 of them with ratings.

To run the tests: `bundle exec rspec`.

If you want to import CSV files, there are already 2 files that you can use or change. You'll find them at `app/spec/fixtures/files`.

### Some of the technology used

On the backend:
- Sidekiq for background processing
- Devise and JWT for authentication
- Alba for serializing
- RSpec with FactoryBot for testing

On the frontend:
 - Bulma as CSS framework - [see docs](https://bulma.io/)
 - Kendo UI for some premade components - [see docs](https://www.telerik.com/kendo-react-ui)
 - react-toastify for some nice toasts - [see npm page](https://www.npmjs.com/package/react-toastify)

### Some features and screenshots
Homepage with user's movies:
![image](https://github.com/laviodias/movies-api/assets/44332001/d197a9ac-c519-41e5-9803-f4e65d207264)

Movies table with filter options and also a button to import a CSV file for massive ratings:
![image](https://github.com/laviodias/movies-api/assets/44332001/bd130b39-9347-4f8b-8252-09f7784188db)

Page to add new movie or import CSV:
![image](https://github.com/laviodias/movies-api/assets/44332001/6af61b2d-fffb-45f1-95ab-fd1d71fac7c4)

Auth pages:

![image](https://github.com/laviodias/movies-api/assets/44332001/6d5ad076-ab12-49c1-9e31-3fd3abcc5642)
![image](https://github.com/laviodias/movies-api/assets/44332001/3ed54242-c822-49c7-913c-f53f25711dcc)

Pages are also responsive:

![image](https://github.com/laviodias/movies-api/assets/44332001/ddbd7064-edb0-49c0-91ab-e292e1fb3b6e)


