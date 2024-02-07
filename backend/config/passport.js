const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/userModel');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
