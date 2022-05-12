const Sequelize = require("sequelize");
const db = require("../connection");

const user = db.define(
	"tags",
	{
		id: {
			type: Sequelize.BIGINT(11),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING(255),
		},
		isActive: {
			type: Sequelize.INTEGER,
		}
	},
	{
		paranoid: true,
		timestamps: true,
		// disable the modification of tablenames; By default, sequelize will automatically
		// transform all passed model names (first parameter of define) into plural.
		// if you don't want that, set the following
		freezeTableName: true,
		// define the table's name
		tableName: "tags",
	}
);
module.exports = user;
