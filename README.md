# bamboo-code-test

1. Running the server
    - First `cd server` and install node_modules with `yarn`
    - Run command `yarn start-server` this should start a server on port `5000`
    - If postgres has db errors, you may need to create a database with the name `bambank-test`


2. Running the client
    - From root `cd client` and install node_modules with `yarn`
    - Run command `yarn start`
    - This should start the client on port `3000`


    
App description
-
When the app is running. You will need to create a user. To send Bambeuros to other users you will need their account number


Areas to improve
-
- Styling
- Custom hooks e.g. To manage axios fetch calls 
- Proper storage and authentication of jwt token on client side
- Splitting of concerns on server side
- Use transaction status
- Validation
- A lot more things :)
