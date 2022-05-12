"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const fileUpload = require('../middleware/fileUpload');
const pdfFileUpload = require('../middleware/pdfFileUpload');
const CasesController = require('./case_controller');
const tagController = require('./tags_controller');
const userController = require('./user_controller');

function pointifyRoutes(router) {
	// Cases routes
	router.get("/getAllCases", CasesController.getAllCasesData);
	router.get("/getSingleCases/:id", CasesController.getSingleCaseData);
	router.post("/createCase", [pdfFileUpload, fileUpload,  CasesController.createCase]);
	router.put("/updateCase/:id", CasesController.updateCase);
	router.delete("/deleteCase/:id", CasesController.deleteCase);

	//users route
	router.post("/login", userController.login);
	router.post("/signup", userController.createUser);

	// tags routes
	router.get('/tags', tagController.getAllTags);
	router.get('/tag/:id', tagController.getSingleTag);
	router.put('/tag/:id', tagController.updateTag);
	router.delete('/tag/:id', tagController.deleteTag);
	router.post('/tag', tagController.createTag);





}
exports.pointifyRoutes = pointifyRoutes;
