const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                if (password==exUser.password) {
                    done(null, exUser);
                } else {
                    done(null, false, { message:'비밀번호가 일치하지 않습니다' });
                }
            } else {
                done(null, false, { message:'존재하지 않는 회원입니다' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};