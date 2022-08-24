# [God's Greenery](http://gods-greenery.herokuapp.com)

---

Hello and welcome to the Keystone.js God's Greenery repo. Here I will go over getting started, the technology stack chosen, the directory structure, deploying to Heroku, and additional resources to help you navigate the app. Good luck! :)

## Getting Started

1. Make sure you have [node.js](https://nodejs.org) installed. Stick with version 7.3.0 to prevent any problems.
2. Once you have this installed and the repo cloned from GitHub to your local machine, run `npm install` inside the directory.
3. Finally, run `npm start` and navigate to [http://localhost:3000](http://localhost:3000)

## Technology Stack

This app uses the following technology stack:

1. [Keystone.js](http://keystonejs.com/getting-started) (additional info [here](http://keystonejs.netlify.com/getting-started))
2. [Pug.js](https://pugjs.org/api/getting-started.html) (formerly Jade) for HTML templating
3. SCSS for preprocessing CSS
4. jQuery for simple JS interactions not convered by Keystone.js
5. node.js for backend Javascript code and running the server
6. MongoDB for database management (attached as mLab to the admin panel of the heroku [app](http://gods-greenery.herokuapp.com))

This project does not use any other JS frameworks or libraries on the front-end (like React, Angular or vue.js), although React is used by Keystone.js in the admin panel

## Folder Structure

**Note:** the repo is called cannabiverse because that was what the project was originally before the ask and requirements changed. I didn't change the name on the repo because I didn't want to cause issues with the git repo.

**Additional note:** anything involving links like the `createLink.js` file or `links.js` was the basis for the Worship playlist. I still needed to add the Spotify API, but time ran out.

```
cannabiverse
L_ models				// This is where all of the Keystone.js models are stored that are editable through the Keystone.js admin panel
L_ node_modules // All of the dependencies needed for the app
L_ public				// Where all the fonts, images, custom JS, and site SCSS is stored. **If moving to a new CMS entirely, this is probably the most critical folder to keep**
L_ routes				// Includes all of the backend scripts for each `templates/views` file
L_ templates
|	L_ emails			// Where e-mail templates go
|	L_ layouts		// The container pages. This was a WIP trying to utilize this feature to create cannabiverse and god's greenery on the same core site, but the requirements for each site ended up being different.
|	L_ mixins			// This is where all the reusable templates are for page components
|	L_ views			// These correlate to all of the different pages on the site. Some (like `galley.pug` are not in use)
L_updates				// This folder contains one file that is used to initialize new DBs with an admin user. You don't need to worry about it.
```

## Deploying to Heroku

The remote `master` branch of the GitHub repo is hooked up to deploy any new pushes to it automatically up to the Heroku [app](http://gods-greenery.herokuapp.com).

## Additional Help

To find out more information about how Keystone.js works with the membership/user login features work, refer to the [SydJS](https://www.sydjs.com/) website and it's open source GitHub [repo](https://github.com/JedWatson/sydjs-site).



