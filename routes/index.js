const router = require('express').Router();
// const passport = require('passport')


router.use('/', require('./swagger'));
router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World');
}
);

router.use('/users', require('./users'));
router.use('/plans', require('./plans'));
router.use('/techniques', require('./techniques'))
router.use('/logs', require('./logs'));

// router.get('/login', passport.authenticate('github'), (req, res) => { })

// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     })
// });


module.exports = router;