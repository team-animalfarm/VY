const pool = require('../models/database');

const userController = {};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.createUser = (req, res, next) => {
  // Grab parsed creds.
  const username = req.body.username;
  const password = req.body.password;

  // first check if both fields are filled, then try to create user
  if (username && password) {
    // insert the username/body variables (from incoming req.body object)
    // into our mongoose(database) model, 'User' using mongoose create method
    // User.create({ username, password }, (err, data) => {
    //   if (err) {
    //     //render error message on signup screen
    //     res.render('./../client/signup', { error: err.errmsg })
    //   } else {
    //     //pass along user id that mongoose creates
    //     res.locals.ssid = data['_id'];
    //     return next();
    //   }

    // })
    const query = {
      text: 'INSERT INTO users(username, password) VALUES($1, $2)',
      values: [username, password],
    }

    pool.connect((err, client, done)=> {
      if (err) throw err;
      client.query(query.text, query.values, (err, res) => {
        if(err) {
          console.log(err.stack);
          return next(err);
        }
        else {
          console.log('success.');
          next();
        }
      });
    });


  } else {
    // if either field was not entered correctly, redirect to signup
    //res.render('./../client/signup', { error: 'error: bad request' });
    console.log('bad input');
    next({ error: 'bad input' });
  }
};

/**
* verifyUser - Obtain username and password from the request body,
* locate the appropriate user in the database, and then authenticate
* the submitted password against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.verifyUser = (req, res, next) => {
  // Grab parsed creds.
  const username = req.body.username;
  const password = req.body.password;

  // User.findOne({ username }, (err, data) => {
  //   if (err) res.locals.err = err;

  //   // data is what is returned from User.findOne
  //   if (data) {
  //     const hashedpw = data._doc.password;
  //     //use bcrypt to see if passed in pw is the same as hashedpw
  //     bcrypt.compare(password, hashedpw, function (err, result) {
  //       if (result) {
  //         res.locals.ssid = data._id;
  //         return next();
  //       } else {
  //         res.redirect('/signup')
  //       }
  //     })

  //   } else {
  //     // if no user found, redirect to signup
  //     res.redirect('/signup');
  //   }


  //   // return next();
  // })
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: username,
  }

  pool.connect((err, client, done)=> {
    if (err) next(err);
    client.query(query.text, query.values, (err, res) => {
      if (err) return console.log(err.stack);
      else {
        console.log(res.rows[0]);
        next();
      }
    });
  });

}


module.exports = userController;
