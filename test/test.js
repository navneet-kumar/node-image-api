const app = require('../server')
var supertest = require('supertest');
var assert = require('assert');
var request = supertest('localhost:3000');

describe('node-image-api', function () {
    let downloadPath;

    after(() => {
        app.consumer.stop()
        app.server.close();
    });

    // test cases
    describe('#fileUploadSuccess', function () {
        it('should return json response with 3 property when a valid image is queued successfully', function (done) {
            request.post('/resize')
                .attach('image', `${__dirname}/Coffee.jpg`)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.status, "success");
                    assert.equal(res.body.message, "Request queued successfully");
                    assert.equal(res.body.downloadUrl.includes("http://localhost:3000/download/"), true);
                    downloadPath = new URL(res.body.downloadUrl).pathname;
                    done();
                });
        });

        describe('#fileUploadFailure', function () {
            it('should return json response with 2 property when invalid or no image is provided', function (done) {
                request.post('/resize')
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.status, "failure");
                        assert.equal(res.body.error, "failed to queue request");
                        done();
                    });
            })
        });

        describe('#fileDownload', function () {
            it('should return http status code 200', function (done) {
                request.get(downloadPath)
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        done();
                    });
            })
        });
    });
})