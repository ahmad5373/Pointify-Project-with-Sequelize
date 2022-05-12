const cases = require('../database/models/cases');
const tag = require('../database/models/tag');

require('dotenv').config();
const Sequelize = require('sequelize');
const { json } = require('sequelize');
const Op = require('sequelize').Op;

//get  all cases
exports.getAllCasesData = async (req, res, next) => {
	try {
		const case_data = await cases.findAll({});
		res.send({ case_data });
		
	} catch (e) {
		res.statusCode = 300;
		res.send('Please Check log DataBase Error');
		console.log(e);
	}
};

exports.getSingleCaseData = async (req, res, next) => {
	try {
		const { id } = req.params;
		const case_data = await cases.findOne({
			where: { id: id, deletedAt: null }
		});
		const Tags = JSON.parse(case_data.tags);
		const tags = await tag.findAll({
			where:{ id:{ [Op.in]: Tags} }
		});
		case_data.tags = tags;
		res.send({ case_data });
	} catch (e) {
		res.statusCode = 300;
		res.send('Please Check log DataBase Error');
		console.log(e);
	}
};

exports.updateCase = async (req, res, next) => {
	try {
		const {
			case_title,
			case_description,
			type_scan,
			tags,
			builing_type,
			material,
			material_quality,
			quality_level
		} = req.body;

		const save_data = {
			case_title,
			case_description,
			type_scan,
			tags: JSON.stringify(tags),
			builing_type,
			material,
			material_quality,
			quality_level
		};
		const updated = await cases.update(save_data, {
			returning: true,
			where: { id: req.params.id }
		});

		return res.status(200).json({
			case_data: updated,
			message: 'Saved successfully'
		});
	} catch (ex) {
		console.log('error saving page content', ex);
		return res.status(401).json({
			message: 'Error saving page content',
			error: ex
		});
	}
};

exports.deleteCase = async (req, res, next) => {
	try {
		const casedelete = await cases.update(
			{
				deletedAt: new Date()
			},
			{
				where: { id: req.params.id }
			}
		);

		return res.status(201).send({
			casedelete
		});
	} catch (e) {
		// console.log(e);
		return res.status(401).json({
			message: 'Error Deleting Case data',
			error: e
		});
	}
};

exports.createCase = async (req, res) => {
	try {
		const {
			case_description,
			case_title,
			envelope,
			file_link,
			image_link,
			level_of_detail,
			miniature_link,
			more_info_link,
			precision,
			tags,
			type_scan,
			visuel
		} = req.body;

		const save_data = {
			case_description,
			case_title,
			envelope,
			file_link,
			image_link,
			level_of_detail,
			more_info_link,
			precision,
			tags: JSON.stringify(tags),
			type_scan,
			visuel,
			miniature_link
		};

		const case_save = await cases.create(save_data);

		return res.status(200).json(case_save);
	} catch (e) {
		console.log(e);
		return res.status(401).json({
			message: 'Error Adding data to Cases',
			error: e
		});
	}
};
