For setting up the backend first of all install all required dependencies like jsonwebtoken, nodemon, bcrypt, express, mongoose.

Configure your .env file 
1)PORT:- add your desired port number.
2)JWT_SECRET:- add your secret for creating token.
3)URL:- Your connection string to the database.

Configure your nodemon, edit your package.json and replace the script by,
 "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },


  Open the terminal and type,
  ``npm run dev`` 
  to start your server and the database
