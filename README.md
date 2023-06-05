[UML class diagram](src/domain/UML/class-diagram.interface.ts)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

# production mode
$ yarn run start:prod
```

## Database migrations
```bash
# update type safety after updating schema
$ yarn prisma generate

# initial schema creation
yarn prisma db push

# generate migration files after schema update
yarn prisma migrate dev --name ${migration_name}

# reset migration (may cause data loss)
yarn prisma migrate reset --preview-feature
``` 

## App
https://admin-roles-app.netlify.app
