# flow_frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Good to know

Since we're hosting this project on Heroku, the first requests might take a little longer.

## Reasons: 

- Application has been unused for a while so it gets unloaded (from the server memory).
- On first hit it gets loaded and stays loaded until some time passes without anyone accessing it.
