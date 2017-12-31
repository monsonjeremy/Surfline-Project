## Preface

In this README I will provide instructions on running the application locally. I will also be discussing a little bit about the application and some of the different decisions I made in the design/code. I'll also touch briefly on the structure of the code on the client side and the server side.

---
### Installation and running the app

##### Base Requirements: 

* Node (Ideally the latest version but the older ones should work)
* Docker
* Git

##### Running locally:

Now to run the app locally, it is pretty easy using docker.

Clone the repo (we'll use ```/Desktop/Surfline-Project``` as the example location):

```git clone https://github.com/monsonjeremy/Surfline-Project.git```

Now run the app:

```
cd Desktop/Surfline-Project
npm run docker:build:prod
```

Now the app should be booting up using Docker containers.

As far as I know this should work on both Windows and Mac, that being said if you run into any issues and can't get it running feel free to email me at monson.jeremy@gmail.com and i'll be happy to help. 

##### Opening the app in the browser:

Now that docker is done building and running the code, you can see it live at ```localhost``` or ```localhost:80```

##### Navigating the UI:

Upon opening the app in the browser you'll see a scrollable sidebar on the left 1/3 of the screen which will contain the list of buoys and some call to action buttons (login, create account, favorite buoy, logout).  On the right 2/3 of the screen is google maps with markers denoting the different buoys. 

You can either see the buoy readings in the sidebar, or you can click on the markers and see individual readings. You can also click the buoy containers in the sidebar to select and zoom onto the marker on the map. Favorite Buoys will show as green markers on the map, the currently selected buoy will show as a red marker with increased size, and then any other buoy will show as a blue marker.

---

## About the app and code

Below i'll outline some of the tech I used as well as give background of some of the assumptions I made and features I designed.

##### React/Redux

I chose react/redux because I really enjoy writing react application and using redux to clearly define the state and the actions that change the state of the application. As with Mongo, I also chose it because it is what you are using at Surfline. 

##### Node

Because full-stack javascript is awesome :)

##### Express

Express is what I have been using in other projects and was a simple choice because it could obviously do the job and I had experience with it.

##### Mongo

I wanted to use Mongo not only because you use it at Surfline but also because it made it easy to create a simple user schema and persist data for the client.

##### Using users to track favorites and persist data

Using users was an assumption that I made from the instructions as a way to track favorites. I felt that using users made the application more extensible and was just a more proper way of tracking favorites.

If users were off the table as part of the application, my solution would probably have been something like using local storage to persist the favorites of a user without having to login. Although this would have it's drawbacks, like showing favorites to a different user using same computer, or not persiting favorites across browsers and other computers. 

##### Implementing authentication 

I've implemented the authentication using Bcrypt and express-sessions. I thought about using a drop in library like Passport or OAuth but I felt it added unecessary boilerplate and complexity considering this wasn't really the goal of the application.

##### Removing favorites

As of writing this I have not implemented this feature as it is not outlined in the requirements. However even after submitting this i'll be continuing to work on it just for fun so it may have been merged in from another branch!

##### React Component/Container pattern

The component/container pattern that I used in this project was a pattern for components and containers that I had seen different places and wanted to try. Essentially all the logic and store connection happens in the container and the component is sort of a dummy view that just renders the HTML and handles conditional renders. This was my first time using this pattern and I ended up really liking it and would use it again. It does have a little more boilerplate, but I do like having the seperation of concerns and being able to centralize similar logic.

##### Server-side Model -> Service -> Controller -> Route pattern

This was a pattern I have used in previous projects and really enjoyed. The model handles schemas (mongoose), the service contains more granular functions for controllers to stitch together functionality, and controllers are the logic for the routes.

##### Redux usage

This project I actually ended up using redux for all state (except error boundary container). As mentioned above, it's easy to reason about state changes and logic when redux is used properly and I believe it makes the code more readable. It also makes it easier than having to refactor when sibling components want to access each others state and data.

##### Google maps

I felt that google maps was a cool addition to this project and was actually really fun to work with. I think it achieves a  cool user experience by allowing a user to see exactly where the buoys are rather than just knowing the lat/long. In this instance, in the interest of time, I used a drop in component from the library ```react-google-maps```. It made it a lot easier and less boilerplate but in a more critical production application, I might opt for handling this on my own depending on the amount of flexibility needed and some of the other pros and cons that may come with using a library. Overall though, i'm satisfied with the result and the library worked exactly as I wanted for this project.

##### Create-react-app

For this project, I used a previous project as boiler plate for file structure, scripts, etc... The project used create-react-app as a base and had the webpack configuration and build scripts pre built. This was also a time saver in that I didn't have to go write my own configuration and worry about ironing out different bugs related to that. The ejected Create-react-app is also pretty extensible and it's nice starting from a base that is built by the facebook team.

##### Linting/Formatting

I've become a huge fan of ESlint and prettier. The way I have it set up in VSCode it does all the formatting and fixing on save which is super helpful for styling the code and avoid typo bugs and missing delimiters or things of that nature.

##### Directory Structure

The client and server code are stored in different sub-directories with their own package files. The root folder has a package file with linting dependencies. I personally prefer to split the dependencies into their own package files or split the client and server into different repos, as I believe it's easier to reason about. It also makes it faster when booting up the docker containers for local development, because the alternative ends up installing the entire list of dependencies for both the server and client containers.

##### Responsiveness and Mobile support

For this project, I've added responsive styling using media queries to optimize for different screen sizes and mobile. The application should work in almost all browsers and on mobile devices.

