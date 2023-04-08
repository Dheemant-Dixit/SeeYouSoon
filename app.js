const express = require('express');
const app = express();
const mongoose=require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const {isLoggedIn}=require('./middleware');

const userRoutes=require('./routes/users');
const { Console } = require('console');
app.use("/user", userRoutes);


const Blood = require('./models/blood');

mongoose.connect('mongodb+srv://vibhanshu03:vibhanshu03@cluster0.v8llplh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
    

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public/'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',userRoutes)


// app.get('/',isLoggedIn, async (req, res) => {
//     res.render('main/home')
//     // res.send('hello home')
// })

app.get('/', isLoggedIn, async (req, res) => {
  try {
    // Get the current user ID from the request object
    const userId = req.user._id;
    
    // Find all posts that have the user's ID as the userId field
    // const bloods = await Blood.find({ userId: userId }).exec();
    res.render('main/home',{user:req.user});
    // localStorage.setItem('userId', userId);
    // console.log(userId);
    // Render the posts.ejs template with the posts and user object
    // res.render('bloods/index', { bloods: bloods, user: req.user });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred');
  }
});

// app.get('/bloods/new', (req, res) => {
//     res.render('bloods/new')
// })
var a;
app.post('/unique', async (req, res) => {
  // console.log(req.body);
  fetch('http://localhost:5000/', {
    method: 'POST',
    body: req.body,
  }).then((res) => {

    // console.log(a);
    // console.log(res);
  });
  res.redirect('/');
});
app.post('/bloods', async (req, res) => {
    const newProduct = new Blood(req.body);
    await newProduct.save();
    res.redirect(`/bloods/${newProduct._id}`)
})
app.get('/bloods/:id', async (req, res) => {
    const { id } = req.params;
    const blood = await Blood.findById(id)
    res.render('bloods/show', { blood })
})
app.get('/authentication', async (req, res) => {
  res.render('authentication');
});
app.get('/new', isLoggedIn, async (req, res) => {
  res.render('main/newpred');
});
app.get('/previous', isLoggedIn, async (req, res) => {
  res.render('main/preprid');
});

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})


