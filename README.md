# bamboo-code-test

1. Running the server
    - First `cd server` and install packages with `yarn`
    - Start postgres https://www.postgresql.org/docs/9.2/server-start.html on port `5432`
    - Run command `yarn start-server` this should start a server on port `5000`
    - If postgres has db errors, you may need to create a database with the name `bambank-test`


2. Running the client
    - From root `cd client` and install packages with `yarn`
    - Run command `yarn start`
    - This should start the client on port `3000`


    
App description
-
Bamboo have decided to open an online bank, Bambank, with its own currency, Bambeuros.
The new bank will run a promotion giving all new customers 100 free Bambeuros when they
sign up.

Areas to improve
-
- Styling
- Testing...
- Custom hooks e.g. To manage axios fetch calls 
- Proper storage and authentication of jwt token on client side
- Splitting of concerns on server side
- Use transaction status
- Validation
- A lot more things :)
