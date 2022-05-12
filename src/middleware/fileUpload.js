var AWS = require('aws-sdk');

module.exports = async (req, res, next) => {
	try {
		const scwCloudConfig = {
			accessKeyId: 'SCWEV9V83MQ98MW5QZWC',
			secretAccessKey: '8ac72204-e186-4522-9d81-9ef266a31beb',
			region: 'fr-par',
			endpoint: new AWS.Endpoint('s3.fr-par.scw.cloud')
		};
		const s3Client = new AWS.S3(scwCloudConfig);
		let p1, p2;
		if (req.body.upload) {
			if (req.body.upload.length > 0) {
				let buf = Buffer.from(req.body.upload[0].thumbUrl.replace(/^data:image\/\w+;base64,/, ''), 'base64');
				let uploadParams = {
					Bucket: 'agc',
					Key: Date.now() + req.body.upload[0].name, // pass key
					Body: buf, // pass file body,
					ACL: 'public-read',
					ContentEncoding: 'base64',
					ContentType: 'image/*'
				};
				p1 = new Promise((resolve, reject) => {
					s3Client.upload(uploadParams, function(err, data) {
						if (err) {
							console.log({ message: 'Error -> ', err });
							reject(err);
						} else {
							req.body.image_link = data.Location;
							resolve(data);
						}
					});
				});
			}
		}
		if (req.body.miniature) {
			if (req.body.miniature.length > 0) {
				let buf = Buffer.from(req.body.miniature[0].thumbUrl.replace(/^data:image\/\w+;base64,/, ''), 'base64');

				uploadParams = {
					Bucket: 'agc',
					Key: Date.now() + req.body.miniature[0].name, // pass key
					Body: buf, // pass file body,
					ACL: 'public-read',
					ContentEncoding: 'base64',
					ContentType: 'image/*'
				};
				p2 = new Promise((resolve, reject) => {
					s3Client.upload(uploadParams, function(err, data) {
						if (err) {
							console.log({ message: 'Error -> ', err });
							reject(err);
						} else {
							req.body.miniature_link = data.Location;
							resolve(data);
						}
					});
				});
			}
		}
		if (req.body.miniature > 0 && req.body.upload) {
			if (req.body.upload.length > 0 && req.body.miniature.length) {
				Promise.all([ p1, p2 ])
					.then((values) => {
						console.log(values);
						return next();
					})
					.catch((err) => {
						res.status(500).json({ error: 'Error -> ' + err });
					});
			}
		} else if (req.body.upload) {
			if (req.body.upload.length > 0) {
				Promise.all([ p1 ])
					.then((values) => {
						console.log(values);
						return next();
					})
					.catch((err) => {
						res.status(500).json({ error: 'Error -> ' + err });
					});
			}
		} else if (req.body.miniature) {
			if (req.body.miniature.length) {
				Promise.all([ p2 ])
					.then((values) => {
						console.log(values);
						return next();
					})
					.catch((err) => {
						res.status(500).json({ error: 'Error -> ' + err });
					});
			}
		} else {
			return next();
		}
	} catch (error) {
		console.log('🚀 ~ file: fileUpload.js ~ line 95 ~ module.exports= ~ error', error);
	}
};
