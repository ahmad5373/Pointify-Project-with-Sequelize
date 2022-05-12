const tags = require('../database/models/tag');
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = require('sequelize').Op;

//get  all tags
exports.getAllTags = async (req, res, next) => {
	try {
		const tags_data = await tags.findAll({});
		res.send({ tags_data });
	} catch (e) {
		res.statusCode = 300;
		res.send('Please Check log DataBase Error');
		console.log(e);
	}
};

exports.getSingleTag = async (req, res, next) => {
	try {
		const { id } = req.params;
		const tags_data = await tags.findOne({
			where: { id: id, deletedAt: null }
		});
		res.send({ tags_data });
	} catch (e) {
		res.statusCode = 300;
		res.send('Please Check log DataBase Error');
		console.log(e);
	}
};

exports.updateTag = async (req, res, next) => {
	try {
		const {
			name,
			isActive
		} = req.body;

		const save_data = {
			name,
			isActive
		};
		const updated = await tags.update(save_data, {
			returning: true,
			where: { id: req.params.id }
		});

		return res.status(200).json({
			tag_data: updated,
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

exports.deleteTag = async (req, res, next) => {
	try {
		const tag_delete = await tags.update(
			{
				deletedAt: new Date()
			},
			{
				where: { id: req.params.id }
			}
		);

		return res.status(201).send({
			tag_delete
		});
	} catch (e) {
		// console.log(e);
		return res.status(401).json({
			message: 'Error Deleting Case data',
			error: e
		});
	}
};

exports.createTag = async (req, res) => {
	try {
		const {
			name,
			isActive
		} = req.body;

		const save_data = {
			name,
			isActive
		};

		// console.log("input data", save_data);
		const case_save = await tags.create(save_data);

		return res.status(200).json(case_save);
	} catch (e) {
		console.log(e);
		return res.status(401).json({
			message: 'Error Adding data to Cases',
			error: e
		});
	}
};
