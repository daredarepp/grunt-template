# Grunt template
Basic grunt template for html/scss/js projects.

### Install:
- **npm install**

### Build:
- **npm run build**
  - Copies html files from **resources/index.html** to **public/index.html** and **resources/pages/** to **public/pages/**
  - Transpiles and minifies JS files from **resources/js/** to **public/js/**
  - Compiles scss files from **resources/scss/** to **public/css/**
    
### Develop:
- **npm run dev**
  - Builds the project
  - Starts a local web server with hot reload capability that serves from **public/**
  - Watches for html, scss, js changes in **resources/**
