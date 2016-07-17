# Book Cover Generator app
=============================

A tool to generate user-generated book covers.


## Setting up

SASS/Jekyll source code outputs the static HTML/CSS files. For any updates to site, please only amend the source files.

(Based on the jekyll-gulp-sass-browser-sync).

GUIDE TO SETTING UP LOCAL DEVELOPMENT ENVIRONMENT:

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

## Backend

1. Download and install Python 3.5.2 from [python.org](https://www.python.org/downloads/)
2. Download and install `virtualenv` to create a virtual environment ([docs](https://virtualenv.pypa.io/en/stable/installation/))
3. Create a virtual environment:

```shell
`virtualenv -p python3 .venv`
```

4. Activate newly created virtual environment:

```shell
source .venv/bin/activate
```

5. Install Python requirements:

```shell
pip install -r requirements.txt
```
