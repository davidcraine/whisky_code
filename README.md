# README

This ssort of a playgrund app to try out different things.  It's called WhiskyCode because I really like whsky (especially Bourbon) and I thought it would be cool to do something related to what I enjoyed.  So I found a CSV file that listed all the distilleries in the US.  This information was pulled from the US Alcohol, Tobacco Tax and Trade Bureau https://www.ttb.gov/foia/list-of-permittees.

I had a few things I wanted to test with this app:
* Setup a docker development environment such that changes to local files will get refpected in running docker container.
* Implement a Google Maps API to show an embedded map
* Use Turbo streams to show and hide a map so that the API call to Google Maps is only made if the user elects to show the map
* setup an rspec environment for testing
* Use database seeding to setup the initail data
* Use BootStrap 5 for styling
* Use kaminari for pagination

The goal is that you should be able to run the application by running
- docker-compose web build
- docker-compose up

This of course assumes you ahve docker installed.



