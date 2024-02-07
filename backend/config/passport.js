const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    done(err, null);
  }
});
