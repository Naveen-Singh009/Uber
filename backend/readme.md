# User Registration and Login Endpoint Documentation

## Endpoints

### 1. `POST /user/register`

This endpoint is used to register a new user in the system.

---

### Request

#### Headers
- **Content-Type**: `application/json`

#### Body Parameters
The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min length: 2)",
    "lastname": "string (optional, min length: 2)"
  },
  "email": "string (valid email address, min length: 5)",
  "password": "string (min length: 6)"
}
```

#### Field Requirements:
- `fullname.firstname`: Required. First name of the user. Must be at least 2 characters long.
- `fullname.lastname`: Optional. Last name of the user. If provided, must be at least 2 characters long.
- `email`: Required. Must be a valid email address and unique in the system.
- `password`: Required. Password for the user account. Must be at least 6 characters long.

---

### Response

#### Success Response
- **Status Code**: `201 Created`
- **Response Body**:

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### Fields:
- `token`: A JWT token generated for the registered user.
- `user`: An object containing user details:
  - `_id`: Unique identifier for the user.
  - `fullname`: Object containing the user's first and last name.
  - `email`: The email address of the user.

#### Error Responses

##### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (e.g., 'body')"
    }
  ]
}
```

##### Example Errors:
- Missing required fields:
  ```json
  {
    "errors": [
      { "msg": "Invalid email", "param": "email", "location": "body" }
    ]
  }
  ```
- Password too short:
  ```json
  {
    "errors": [
      { "msg": "password must be atleast 6 char long", "param": "password", "location": "body" }
    ]
  }
  ```

---

### 2. `POST /user/login`

This endpoint is used to authenticate an existing user and provide a JWT token for further access.

---

### Request

#### Headers
- **Content-Type**: `application/json`

#### Body Parameters
The request body must be a JSON object with the following structure:

```json
{
  "email": "string (valid email address, min length: 5)",
  "password": "string (min length: 6)"
}
```

#### Field Requirements:
- `email`: Required. Must be a valid email address.
- `password`: Required. Password for the user account. Must be at least 6 characters long.

---

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### Fields:
- `token`: A JWT token generated for the authenticated user.
- `user`: An object containing user details:
  - `_id`: Unique identifier for the user.
  - `fullname`: Object containing the user's first and last name.
  - `email`: The email address of the user.

#### Error Responses

##### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (e.g., 'body')"
    }
  ]
}
```

##### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**:

```json
{
  "message": "Invalid email or password"
}
```

---

## Implementation Details

### Validation
- The following validations are performed:
  - `fullname.firstname`: Must be at least 2 characters long.
  - `fullname.lastname`: If provided, must be at least 2 characters long.
  - `email`: Must be a valid email address.
  - `password`: Must be at least 6 characters long.

### Notes
- Passwords are stored securely using hashing.
- A JWT token is returned upon successful registration or login, which can be used for authentication in subsequent requests.



