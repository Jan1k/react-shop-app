// const express = require("express");

const { Router } = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

let User = require("../../models/User");

const usersRouter = new Router();

usersRouter.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

usersRouter.post("/login", (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        emailnotfound: "Email not found"
      });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        };
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: "Password incorrect"
          });
      }
    });
  });
});


usersRouter.post('/reset', (req,res) => {
  if (req.body.email === ''){
    res.json('email required');
  }
  console.log(req.body.email);
  User.findOne({email: req.body.email}).then(user => {
    if (user === null) {
      console.log('email not in database');
      res.json('email not in db');
    }
    else {
      const token = crypto.randomBytes(20).toString('hex');
      console.log(token);
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: `mobileShopApp@gmail.com`,
        to: `${user.email}`,
        subject: `Link to Reset Password`,
        text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:5000/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };
      console.log('sending email');

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error('there was an error', err);
        }
        else {
          console.log('here is the res:', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
})


module.exports = usersRouter;