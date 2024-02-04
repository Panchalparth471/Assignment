#Setting Up the Backend

For setting up the backend first of all install all required dependencies like jsonwebtoken, nodemon, bcrypt, express, mongoose.

Configure your .env file <br>
1)PORT:- add your desired port number. <br>
2)JWT_SECRET:- add your secret for creating token. <br>
3)URL:- Your connection string to the database. <br>

Configure your nodemon, edit your package.json and replace the script by, <br>
 "scripts": { <br>
    "start": "node index.js", <br>
    "dev": "nodemon index.js" <br>
  },

<br>
  Open the terminal and type,
  ``npm run dev`` 
  to start your server and the database
