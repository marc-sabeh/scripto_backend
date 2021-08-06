# scripto_backend

Here is the task asked of me for scripto Company <br>
All tech stacks asked in the description are used
## Start the app

You can start by going into the db folder and fixing the db configuration for your local we are using posgres sql
and in the database.sql script you can run in postgres

## For the apis
<br>

### Users Crud


```bash
# Get all users
Get http://localhost:3000/users
```

```bash
# will sign up a user
Post http://localhost:3000/users/signup

Payload:{
    "username": "john",
    "email": "john@outlook.com",
    "password": "123456"
}
```

```bash
# will login the user and give back a token 
Post http://localhost:3000/users/login

Payload:{
    "email": "john@outlook.com",
    "password": "123456"
}
```

```bash
# will delete a user but you have to give it the autorization header as the bearer token you got from loging in 
Delete http://localhost:3000/users/:userId
```

<hr>

### Movies Crud
All those need authentication


```bash
# Get all movies
Get http://localhost:3000/movies
```

```bash
# will insert a new movie to the db (rating should be in the db)
Post http://localhost:3000/movies

Payload:{
    "movie_name": "avengers",
    "rating": "R"
}
```

```bash
# will update the movie data
Patch http://localhost:3000/movies/:movieId

Payload:{
    "movie_name": "avengers 2",
    "rating": "PG"
}
```

```bash
# will delete a movie
Delete http://localhost:3000/movies/:movieId
```


<hr>

### Rating Crud
All those need authentication

```bash
# Get all ratings
Get http://localhost:3000/ratings
```

```bash
# will insert a new rating to the db 
Post http://localhost:3000/ratings

Payload:{
    "rating": "PG"
}
```

```bash
# will update the rating data
Patch http://localhost:3000/ratings/:ratingId

Payload:{
    "rating": "PG-13"
}
```

```bash
# will delete a rating
Delete http://localhost:3000/ratings/:ratingId
```


<hr>

<br>
Thank you for your time!
