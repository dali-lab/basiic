# Basiic

This repo has the MVP created by the DALI lab for Jon Kramer's project **Basiic**. The aim of this MVP is to set up a toy diagramming software using the tech stack intended for the longer term project.

This MVP sets up a multi-platform desktop application using electron, react, and raphael. Note that the entire directory structure is based on @chentsulin's [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), so a lot of questions about why things are the way they are can be answered looking at the boilerplate's README.

This MVP app is a one-screen display that allows a user to create a simple diagram with circles, squares, and simple connections between them.

![In-App Image](https://github.com/dali-lab/basiic/blob/master/resources/diagram_example.png "Example User Diagram")

## Install
**Note: requires a node version >= 6 and an npm version >= 3.**

First, clone the git repository:
```bash
git clone https://github.com/dali-lab/basiic.git your-directory-name
```

Second, install the dependencies:
```bash
cd your-directory-name && npm install
```

## Run
To run the app with hot reloading, run the following two commands in separate terminal tabs:
```bash
$ npm run hot-server
$ npm run start-hot
```

When running with the hot-server, there are two tricky things to keep in mind:
1. Be sure to wait for `npm run hot-server` to print `Listening at http://localhost:3000` before running `npm run start-hot` or you will get a **~spooky error~**.
2. If you make serious changes to the react app structure (or critical states), end the process running `npm run start-hot` and start it again. This will close the app and allow it to reload. Don't close `npm run hot-server` or you'll be waiting around for a while.

To run the app without hot reloading, run the following commands in one terminal window in order:
```bash
$ npm run build
$ npm start
```

## Tech Stack
The tech stack we ended on is as follows:
* [Electron](https://electron.atom.io/) - platform for building a cross-platform desktop application using web technologies
* [React](https://facebook.github.io/react/)/[Redux](http://redux.js.org/) - Front end web technologies making interactive UI seemless
* [Raphael.js](http://dmitrybaranovskiy.github.io/raphael/) - A JS library to make working with SVGs easier
* [react-raphael](https://github.com/liuhong1happy/react-raphael) - A library that creates React component wrappers for Raphael objects

## Layout
The root directory contains all of the boilerplate setup necessary for an Electron App. The `app` directory has the contents of the webapp itself. Specifically, `app/containers` has a series of react containers, and `app/components` contains the main react components. Right now the app uses pure react, but ideally we'd port over to redux soon!

The following are react containers used in the app:
* App.js - The main container for the electron App. Has child components `ShapeBar` and `Canvas`. Owns the app's state (which shape is being drawn, what size, clearing signal, etc.) and passes down to children.

The following are react components used in the app:
* ShapeBar.js - A menu bar across the top of the screen that has a series of buttons to change app state.
..* ShapeOption.js - A single button representing an option in the state of the app.
* Canvas.js - A container composed of a `Diagram` overlaid on top of a `DotGrid`.
..* DotGrid.js - A SVG-pattern dotgrid in the style of Logisim.
..* Diagram.js - The actual work-horse representing the diagram (blocks and connections) created by a user.
....* ConnectionPoint.js - A point at which a connection can start or end.

## The Future and TODOs
There's a lot of work to be done here to move from this MVP to a more production-quality version of what we'd like basiic to be. For one, our infrastructure is set up to handle redux, but we haven't ported from pure react yet. Additionally, setting up diagrams to persist and connect to code are two or the bigger future TODOs. Finally, because this was somewhat hacked together, it's be nice to replace some of the tech debt; specifically, moving away from magic numbers in absolute dimensions and towards inline-CSS, and abstracting Blocks and Connections out into their own components. At that point, it will most likely be worth rebuilding the app significantly to coincide with the redesigned user flows (thanks @DALI!).
