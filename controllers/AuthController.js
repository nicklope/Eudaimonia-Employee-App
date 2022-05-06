const User = require('../models/User')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    console.log('User:' + user.passwordDigest)
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user._id,
        userName: user.userName
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { email, password, name, userName } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await new User({ email, passwordDigest, name, userName })
    user.save()
    res.send(user)
  } catch (error) {
    throw error
  }
}

// const UpdatePassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: req.body.email } })
//     if (
//       user &&
//       (await middleware.comparePassword(
//         user.dataValues.passwordDigest,
//         req.body.oldPassword
//       ))
//     ) {
//       let passwordDigest = await middleware.hashPassword(req.body.newPassword)

//       await user.update({ passwordDigest })
//       return res.send({ status: 'Success', msg: 'Password Updated' })
//     }
//     res.status(401).send({ status: 'Error', msg: 'Invalid Credentials' })
//   } catch (error) {
//     throw error
//   }
// }
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  CheckSession
}
