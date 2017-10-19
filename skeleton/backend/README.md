
## Set-up

 - install docker
 - exec `docker-compose build --no-cache`
 - update your own `/etc/hosts` file
 - start application using `docker-compose up -d`

## Hosts

```
127.0.0.1 developers.dev api.developers.dev
```


## Install dependencies
Needs for your IDE

```
docker-compose run --no-deps --rm web /bin/bash -c 'yarn install'
```


## Add new npm package

```
docker-compose run --no-deps --rm web /bin/bash -c 'yarn add YOUR_PACKAGE_NAME'
```


## Run tests

```
docker-compose run --rm web /bin/bash -c 'yarn test'
```

## Regenerate documentation for API

```
docker-compose run --rm web /bin/bash -c 'yarn apidoc'
```


## MySQL bash

```
docker-compose exec mysql bash
```

## Migrations

Create migration
```
docker-compose exec web /bin/bash -c 'yarn migrations-create -- <migration file name>'
```
Run migrations
```
docker-compose exec web /bin/bash -c 'yarn migrations-run'
```
Revert last migration
```
docker-compose exec web /bin/bash -c 'yarn migrations-revert'
```


Open in your favorite browser http://developers.dev/

API endpoint: http://api.developers.dev/

API documentation: http://developers.dev/api-doc/

