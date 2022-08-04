const express = require('express');
const { registerUser, loginUser, users, findAnagram } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(isAuthenticatedUser, authorizeRoles("admin") ,users);
router.route('/anagram').post(findAnagram);

module.exports = router;