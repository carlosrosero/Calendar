react-calendar-app
===============

Calendar app written in JS/ES6 and reactjs

**Demo** is available [here]

Development
-------------------
The project was developed in the following environmenet
```
$ cat /proc/version
Linux version 3.16.0-4-amd64 (debian-kernel@lists.debian.org) (gcc version 4.8.4 (Debian 4.8.4-1) ) #1 SMP Debian 3.16.36-1+deb8u1 (2016-09-03)
$ node -v
v6.2.2
$ npm -v
3.10.2

```

How to run it locally
----------------------------
Clone the repo
```
$ git clone git@github.com:apedyashev/react-calendar-app.git
```
Install all the dependencies
```
$ cd react-calendar-app && npm install
```
Start the dev server
```
$ npm start
```

Open http://0.0.0.0:3000  or http://localhost:3000 in your browser

Additional commands
-------------------------------

Lint all the source code
```
npm run lint
```
Run tests
```
npm run test
```
Build the project
```
npm run build
```
Deploy the project to [gh-pages] (works only if you have forked the repo, since it pushed to the `gh-pages` branch of your repo)
```
npm run deploy 'Commit message'
```

[gh-pages]: https://pages.github.com/
[here]: https://apedyashev.github.io/react-calendar-app
