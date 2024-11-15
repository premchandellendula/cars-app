# Car Management App

The Car Management App allows users to add new cars, update them, and view them. The app also supports adding images and tags. The app includes both frontend and backend components, with secure authentication using JWT.

## Tech Stack

### Frontend

- ReactJS
- TailwindCSS
- Axios

### Backend

- NodeJS
- ExpressJS
- MongoDB
- Cloudinary
- JWT

## Features

- Users are able to signup/login and recieves a authenticated JWT token.
- Users can add a new car with title, description, images, tags, etc.,
- Users can also view cars of other users, and can update the cars of their own, and delete too. 
- There is a search functionality, where a user types something related to company, tags, price etc., the cars related to search appears.

## Project Setup

1. **clone the repository**
```bash
   git clone https://github.com/premchandellendula/cars-app.git
```

2. Switch to frontend

```
cd frontend
```

```
npm install
```

```
ng serve --open
```

3. switch to backend

```
cd backend
```

### Create ```.env``` file and add Mongo URL

```
MONGO_URL=mongodb+srv://<your-mongodb-url>
```

### Create ```config.js``` file and add JWT_SECRET

```
const JWT_SECRET = "your_jwt_secret"

module.exports = {
    JWT_SECRET
}
```

```
npm install
```

```
node index.js
```