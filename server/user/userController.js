const bcrypt = require('bcryptjs');
const db = require('../data/database');

const SALT_WORK_FACTOR = 10;

const userController = {};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.createUser = async (req, res, next) => {
  // Grab parsed creds.
  const { username, password } = req.body;

  // first check if both fields are filled, then try to create user
  if (username && password) {

    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    const hashedPass = bcrypt.hashSync(password, salt);

    const query = {
      text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
      values: [username, hashedPass],
    }

    try {
      const result = await db.query(query);
      // if no records returned, throw an error
      if (result.rows.length === 0) {
        return next({ 
          error: 'Database error creating user',
        });
      }
      res.locals.userId = result.rows[0].id;
      res.locals.user = result.rows[0];
    } catch (error) {
      return next({
        error: 'Database error while creating user',
      });
    }
    // missing info
  } else {
    return next({ 
      error: 'bad input',
    });
  }
  return next();
};

/**
* verifyUser - Obtain username and password from the request body,
* locate the appropriate user in the database, and then authenticate
* the submitted password against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.verifyUser = async (req, res, next) => {
  // Grab parsed creds.
  const { username, password } = req.body;
  // verify that both a username and a password were submitted
  if (username && password) {
    // user will be found using the username, then will be verified
    // after they enter the correct password before we give ok
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    try {
      const result = await db.query(query);
      // no user found
      if (result.rows.length === 0) {
        return next({ 
          error: 'incorrect username',
        });
      }
      // otherwise, hash the password and compare to record in DB
      const hashedPw = result.rows[0].password;
        
      bcrypt.compare(password, hashedPw, (err, data) => {
        // correct password
        if (data) {
          res.locals.user = result.rows[0];
          res.locals.userId = result.rows[0].id;
          console.log(`setting userId to ${res.locals.userId}`);
        } else {
          return next({
            error: 'Incorrect password',
          });
        }
        return next();
      });
    } catch (err) {
      return next({ 
        error: 'Database unknown error verifying user',
      });
    }
  } else {
    return next({
      error: 'Missing credentials',
    });
  }
};


module.exports = userController;
