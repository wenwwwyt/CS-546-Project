const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;


router.get('/', async (req, res) => {
  if (req.session.user) res.redirect('/');
  else res.render('function/Login');
});

router.get('/signup', async (req, res) => {
  if (req.session.user) res.redirect('/');
  else res.render('function/Signup')
});

router.post('/signup', async (req, res) => {
  var body = req.body;
  const firstname = body.firstname;
  const lastname = body.lastname;
  const email = body.email;
  const password = body.password;
  try {
    if (!firstname || !lastname || !email || !password)
      throw "must provide all inputs";
    let x = await userData.createUser(firstname, lastname, email, password)
    if (x) res.redirect('/')
    else res.status(500).json({ error: "Internal Server Error" })
  } catch (e) {
    res.status(400).render('function/Signup', { error: e });
  }
});

router.post('/login', async (req, res) => {
  var body = req.body;
  const firstname = body.firstname;
  const lastname = body.lastname;
  const email = body.email;
  const password = body.password;
  try {
    if (!firstname)
      throw "must provide 1";
    if (!lastname)
      throw "must provide 2";
    if (!email)
      throw "must provide 3";
    if (!password)
      throw "must provide 4";
    if (!firstname || !lastname || !email || !password)
      throw "must provide all inputs";
    let check = await userData.checkUser(email, password)
    if (check) req.session.user = email;
    else res.status(400).json({ error: "Didn't provide a valid username and/or password" })
    res.redirect('/');
  } catch (e) {
    res.status(400).render('function/Login', { error: e });
  }
});

router.get('/private', async (req, res) => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  let name;
  for (i = 0; i < userList.length; i++) {
    if (req.session.user.username.toLowerCase() == userList[i].username.toLowerCase()) { name = userList[i].username; break; }
  };
  res.render('users/private', { username: name });
});

router.get('/modify', async (req, res) => {
  try {
    const id = req.id;
    const email = req.email;
    const gender = req.gender;
    const city = req.city;
    const state = req.state
    const age = req.age;
    const description = rq.description;
    await userData.modifyUserProfile(id, email, gender, city, state, age, description)
    res.redirect('/private')
  } catch (e) {
    res.status(400).render('users/error')
  }
});
router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.render("users/logout")
});


router.get('/error', async (req, res) => {
  res.status(403).render('users/notlogin')
})
module.exports = router;