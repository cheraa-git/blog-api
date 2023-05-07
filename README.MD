# Blog API

# Documentation

**Base url: `https://blog-api-qsno.onrender.com/api/v1`**

## Authorization endpoints

### POST `/auth/register`

Create a new user.

Request body:

- email (required, string)
- nickname (required, string)
- password (required, string)

Examples responses:

**Status 200**

```json
{
  "id": 1,
  "nickname": "John Doe",
  "email": "johndoe@example.com",
  "token": "..."
}
```

**Status 400**

```json
{
  "name": "AuthorizationError",
  "message": "email/nickname already exists"
}
```

### POST `/auth/login`

Authenticate a user.

Request body:

- email (required, string)
- password (required, string)

Examples responses:

**Status 200**

```json
{
  "id": 1,
  "nickname": "John Doe",
  "email": "johndoe@example.com",
  "token": "..."
}
```

**Status 400**

```json
{
  "name": "AuthorizationError",
  "message": "The email/password is invalid"
}
```

### POST `/auth/autologin`

Automatically log in a user using an access token.

Request body:

- token (required, string)

Examples responses:

**Status 200**

```json
{
  "id": 1,
  "nickname": "John Doe",
  "email": "johndoe@example.com",
  "token": "..."
}
```

**Status 400**

```json
{
  "name": "AuthorizationError",
  "message": "Invalid token"
}
```

## Articles endpoints

### GET `/article?page=0&pageSize=20`

Get a page of articles.

**Query params**

- page (default: 0)
- pageSize (default: 20; max: 100)

Example response:

**Status 200**

```json5
{
  "articles": [
    {
      "id": 1,
      "userId": 1,
      "title": "Article Title",
      "imageUrl": "http://path-to-image.png",
      "content": "Article content",
      "createdAt": "2023-05-06T06:04:25.579Z",
      "updatedAt": "2023-05-07T08:13:32.045Z"
    },
    // ...
  ],
  "countAll": 112,
}
```

### GET `/article/{id}`

Get article by id.

Example response:

**Status 200**

```json5
{
  "id": 1,
  "userId": 1,
  "title": "Article Title",
  "imageUrl": "http://path-to-image.png",
  "content": "Article content",
  "createdAt": "2023-05-06T06:04:25.579Z",
  "updatedAt": "2023-05-07T08:13:32.045Z"
}
```

### POST `/article`

Create a new article.

Authorization header (`Bearer [token]`) is required

**Request body**

- title (string)
- content (string)
- imageUrl (string)

Example response:

**Status 200**

```json5
{
  "id": 1,
  "userId": 1,
  "title": "Article Title",
  "imageUrl": "http://path-to-image.png",
  "content": "Article content",
  "createdAt": "2023-05-06T06:04:25.579Z",
  "updatedAt": "2023-05-07T08:13:32.045Z"
}
```

### PUT `/article`

Update information about a specific article.

Authorization header (`Bearer [token]`) is required.

**Request body**

- id (required, number)
- title (string)
- content (string)
- imageUrl (string)

Example response:

**Status 200**

```json5
{
  "id": 1,
  "userId": 1,
  "title": "Article Title",
  "imageUrl": "http://path-to-image.png",
  "content": "Article content",
  "createdAt": "2023-05-06T06:04:25.579Z",
  "updatedAt": "2023-05-07T08:13:32.045Z"
}
```

### DELETE `/article/{id}`

Delete a specific article.

Authorization header (`Bearer [token]`) is required.

Request Params

- id (number, required) - The identifier of the article.

Example response:

**Status 200**

```json5
{
  "id": 1
}
```
