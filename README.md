![image](https://github.com/davidcraine/whisky_code/assets/68412459/f9c628cd-0860-4ecc-8b5d-94fe7f14968b)

# README

This ssort of a playgrund app to try out different things.  It's called WhiskyCode because I really like whsky (especially Bourbon) and I thought it would be cool to do something related to what I enjoyed.  So I found a CSV file that listed all the distilleries in the US.  This information was pulled from the US Alcohol, Tobacco Tax and Trade Bureau https://www.ttb.gov/foia/list-of-permittees.

## Summary
I had a few things I wanted to test with this app:
* Setup a docker development environment such that changes to local files will get refpected in running docker container.
* Implement a Google Maps API to show an embedded map
* Use Turbo streams to show and hide a map so that the API call to Google Maps is only made if the user elects to show the map
* setup an rspec environment for testing
* Use database seeding to setup the initail data
* Use BootStrap 5 for styling
* Use kaminari for pagination
* use Stimulus to handle dropdown events
* add a real-time search for owners

## Running the app
The goal is to make running the application simple.  To do this, docker is employed to simplify botht the rails and postgres setup.  By performing the following steps you should be able to get the application up and running.
- install docker desktop
- pull down the repo
- run docker-compose build
- run docker-compose up
- navigate in a browser to http://localhost:3000
- if you want to make it so you can edit the source code and have it reflect in the docker web container, you can just uncomment the second volume entry for the web app in the docker-compose.yml file:
```yaml
    volumes:
      - app-storage:/rails/storage
#      - ./app:/rails/app
```
This will mount your local app directory as a volume in the container, essentially replacing the app directory that is copied in as part of the edev-dockerfile. We use a separate
dev.dockerfile instead of the main Dockerfile for this very purpose, i.e., to allow local developement using the running docker container. 

This of course assumes you ahve docker installed.

## Change Log
**1/19/2024**

In this implementation the distilleries#index page does double-duty as both a normal index view and as a turbo-frame view.  The distillery data in the page is wrapped in a turbo-frame tag.  The Links within the data are configured to bypass turbo-frames and redirect as normal using the RedirectLink Stinulus controller.  But the Search text field is configured to use the TextSearch stimulus controller to initiate a Turbo.visit call to he index page which get's interpreted by the controller as  an action to perform a turbo_stream.replace() to replace the contents of the distilleries-frame trubo frame with the results of the search.  This is done in the index action by checking if the request is a turbo_frame request or a normal request.

## Screenshots
### Mainindex page
------------------
![image](https://github.com/davidcraine/whisky_code/assets/68412459/296f5d2d-3548-489f-883c-c3af2e984dc8)

### Real-Time Text Search
-------------------------
![image](https://github.com/davidcraine/whisky_code/assets/68412459/a16cf70b-1469-409c-ba75-36c51e3ba3cc)

### State Search
----------------
![image](https://github.com/davidcraine/whisky_code/assets/68412459/4474c08a-d128-4931-bb21-918cf60bbbdd)

### Show Page
-------------
![image](https://github.com/davidcraine/whisky_code/assets/68412459/e4cfd349-ff31-4c30-a1d2-063cfe10d3f5)






