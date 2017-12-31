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

---

### About the app and code

##### React and Node for the client and server side:

This was an easy decision for me, i'm most comfortable with React and Node and really enjoy full-stack JS. I al