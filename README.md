# Book Cover Generator app
=============================

A tool to create user-generated book covers and share on social media.


## Setting up

### Frontend
To compile SASS in an easy way install Gulp + NodeJS.

Run:

```shell
npm install
```

To start Gulp, which monitors and compiles SCSS to CSS run:

```shell
gulp
```

Now all files in ```_scss``` are watched and the ```_scss/main.scss``` compiles to ```bcg/static/css/main.css``` on save.

If you want to compile the JS (all source files are in ```_js```) to the file ```scripts.min.jsz```, then run:

```shell
gulp minifyJS
```


### Backend

1. Download and install Python 3.5.2 from [python.org](https://www.python.org/downloads/)
2. Download and install `virtualenv` to create a virtual environment ([docs](https://virtualenv.pypa.io/en/stable/installation/))
3. Create a virtual environment:

```shell
virtualenv -p python3 .venv
```

4. Activate newly created virtual environment:

```shell
source .venv/bin/activate
```

5. Install Python requirements:

```shell
pip install -r requirements.txt
```


### Database
For image upload and handling.

1. Install all dependencies: ```pip install -r requirements.txt```

2. Install Postgres (protip: http://postgresapp.com/)

3. Within psql, run: ```create database danandphil;```

4. Run Django migrations to populate database: ```python manage.py migrate```
