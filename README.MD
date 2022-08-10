# Api server for the ecommerce admin cms

here is the repo for the frontend app...

## APIs

All the endpoint will follow the follwoing pattern `{rooturl}/api/v1`

### Amin login user Api

This api endpoint is responsible for handling all the admin user realted request.

All the Admin api endpoint will follow the following patterns `{rooturl}/api/v1/admin-user`

| #   | PATH | METHOD | PRIVATE | DESCRIPTION                                                                                                                 |
| --- | ---- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1.  | `/`  | POST   | No      | Receives new admnin data and create new admin in database. If the email already exist, it will return email already in use. |

| 2. | `/verify-email` | PATCH | No | Receives `email,verificationCode` to verify newly create user action, returns success or error accordingly. |

| 3. | `/login` | POST | No | Receives `{email, password}` and check is the user exist for that combination in our database, if it does, it will handle the login process. |
