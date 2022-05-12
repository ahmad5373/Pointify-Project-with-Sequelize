var AWS = require('aws-sdk');

module.exports = async (req, res, next) => {
	const scwCloudConfig = {
		accessKeyId: 'SCWEV9V83MQ98MW5QZWC',
		secretAccessKey: '8ac72204-e186-4522-9d81-9ef266a31beb',
		region: 'fr-par',
		endpoint: new AWS.Endpoint('s3.fr-par.scw.cloud')
	};
	const s3Client = new AWS.S3(scwCloudConfig);
	if (req.body.uploadPDF) {
		if (req.body.uploadPDF.length > 0) {
			let buf = Buffer.from(
				req.body.uploadPDF[0].thumbUrl.replace(/^data:application\/\w+;base64,/, ''),
				'base64'
			);
			let uploadParams = {
				Bucket: 'agc',
				Key: Date.now() + req.body.uploadPDF[0].name, // pass key
				Body: buf,
				ACL: 'public-read',
				ContentType: 'application/pdf'
			};
			s3Client.upload(uploadParams, async function(err, data) {
				if (err) {
					console.log({ message: 'Error -> ', err });
					res.status(500).json({ error: 'Error -> ' + err });
				} else {
					req.body.file_link = data.Location;
				}
			});
		}
	} 

	return next();
};
