var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
var port = process.env.PORT || 5000;

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(fileUpload());

app.listen(port, function() {
    console.log('Listening on port', port);
});

app.use(express.static(__dirname + '/public'));

// Imports the Google Cloud client library
var vision = require('@google-cloud/vision')({
    projectId: 'labeler-155323',
    keyFilename: 'C:\\Users\\Rayce\\Desktop\\VisionAPI\\Labeler-d158704619d4.json'
});

app.post("/upload", function(req, res) {
    console.log(req.files);
    var fileName = req.files.file.name;

    let file = req.files.file;

    file.mv(__dirname + '/images/' + fileName, function(err) {
        if (err)
            console.log(err);
    });

    vision.detectLabels(__dirname + '/images/' + fileName)
        .then((results) => {
            const labels = results[0];

            console.log('Label Object:');
            console.log(results[1].responses[0].labelAnnotations);

            console.log("Result: " + labels[0]);

            res.send(results[1].responses[0].labelAnnotations);
        });
});
