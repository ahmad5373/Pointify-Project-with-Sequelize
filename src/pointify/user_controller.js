const user = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//it will handle login request
exports.login = (req, res, next) => {
	const { email, password } = req.body;

	user.findOne({ where: { email: email, deletedAt: null } }).then(async function (userData) {
		if (!userData) {
			return res.status(401).json({
				message: "Incorrect email",
			});
		} else {
			resoponse_compare = await bcrypt.compare(password, userData.password);
			if (resoponse_compare) {
				//if password compared successfully, mean users logged in. We will assign him a JWT token that user will use to access protected end points
				const token = jwt.sign(
					{
						id: userData.id,
						roleId: userData.roleId,
						email: userData.email,
						userName: userData.userName,
						phone: userData.phone,
					},
					process.env.SECRET, //env secret is picked from env file
					{
						expiresIn: "24h",
					}
				);
				let answer = {
					id: userData.id,
					roleId: userData.roleId,
					email: userData.email,
					userName: userData.userName,
					phone: userData.phone,
				};
				return res.status(200).json({
					message: "logged in successfully",
					user: answer,
					token: token,
				});
			} else {
				return res.status(401).json({
					message: "Incorrect Password",
				});
			}
		}
	});
};

//to create a new user
exports.createUser = async (req, res, next) => {
	try {
		const { first_name, last_name, email, phone, password } = req.body;

		await user.findOne({ where: { email: email, deletedAt: null } }).then(async function (userData) {
			if (userData) {
				return res.status(401).json({
					message: "Email already exist",
				});
			} else {
				const roleId = "1";
				const userName = first_name + " " + last_name;
				const encyptPassword = await bcrypt.hash(password, 10); //encrypt password using bcrypt technique
				const data = {
					userName: userName,
					roleId: roleId,
					password: encyptPassword,
					email: email,
					phone: phone
				};
				const userData = await user.create(data);
				//create user and also assign him token
				const token = jwt.sign(
					{
						id: userData.id,
						roleId: userData.roleId,
						email: userData.email,
						userName: userData.userName,
					},
					process.env.SECRET, //env secret is picked from env file
					{
						expiresIn: "24h",
					}
				);
				let answer = {
					id: userData.id,
					email: userData.email,
					userName: userData.userName,
				};
				return res.status(200).json({
					message: "User Created successfully",
					user: answer,
					token: token,
				});
			}
		});
	} catch (ex) {
		console.log("error creating user", ex);
		return res.status(401).json({
			message: "Error creating User",
			error: ex,
		});
	}
};
