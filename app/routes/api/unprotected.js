const express = require("express");
const userService = require("../../services/user");
const { loginPayloadValidator } = require("./middleware/userValidator");
const { matchedData } = require("express-validator");
const isPasswordMatch = require("../../utils/isPasswordMatch");
const resultJson = require("../../utils/resultJson");
const { error } = require("../../utils/errorUtils");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/login", loginPayloadValidator, async (req, res, next) => {
    try {
        const { email, password } = matchedData(req);
        const user = await userService.findByEmail(email);

        if(user == null) return next(
            error("Invalid email or password")
        );

        if (!(await isPasswordMatch(password, user.password)))
            return next(
                error("Invalid email or password")
            );

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role_id: user.role_id
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.json(resultJson({ token }));
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
