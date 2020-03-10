var nock = require('nock');
var assert = require('assert');

describe('file upload', function () {
    describe('#resize', function () {
        it('should return valid json object containing download url', function () {
            nock('http://localhost:3000')
                .post('/resize', Buffer.from([0xff, 0x11]))
                .reply(200)
        });
    });
});

describe('file download', function () {
    describe('#indexOf()', function () {
        it('should return 1 when item is present', function () {
            assert.equal([1, 2, 3].indexOf(2), 1);
        });
    });
});