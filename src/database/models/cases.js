const Sequelize = require("sequelize");
const db = require("../connection");
const cases = db.define(
	"cases",
	{
		id: {
			type: Sequelize.BIGINT(11),
			autoIncrement: true,
			primaryKey: true,
		},

		case_title: {
			type: Sequelize.STRING(255),
		},
		envelope: {
			type: Sequelize.STRING(255),
		},
		visuel: {
			type: Sequelize.STRING(255),
		},
		precision: {
			type: Sequelize.STRING(255),
		},
		level_of_detail: {
			type: Sequelize.STRING(255),
		},
		case_description: {
			type: Sequelize.TEXT(),
		},
		type_scan: {
			type: Sequelize.STRING(255),
		},
		tags: {
			type: Sequelize.TEXT('long'),
		},
		image_link: {
			type: Sequelize.STRING(255),
		},
		miniature_link:{
			type: Sequelize.STRING(255),
		},
		file_link: {
			type: Sequelize.STRING(255),
		},
		more_info_link: {
			type: Sequelize.STRING(255),
		},
		builing_type: {
			type: Sequelize.STRING(255),
		},

		material: {
			type: Sequelize.STRING(255),
		},
		material_quality: {
			type: Sequelize.INTEGER,
		},
		quality_level: {
			type: Sequelize.INTEGER,
		},
        createdAt: {
			type: Sequelize.DATE,
		},
        updatedAt: {
			type: Sequelize.DATE,
		},
		deletedAt: {
			type: Sequelize.DATE,
		}

	},
	{
		paranoid: true,
		timestamps: true,
		freezeTableName: true,
		tableName: "cases",
	}
);

module.exports = cases;
