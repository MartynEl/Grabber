var http = require("http");
var stream = require('stream');
var util = require('util');

// node v0.10+ use native Readable, else polyfill
var Readable = stream.Readable ||
    require('readable-stream').Readable;
util.inherits(DownloadStream, Readable);

function DownloadStream(url, output) {
    // allow use without new
    if (!(this instanceof DownloadStream)) {
        return new DownloadStream(url, output);
    }
    Readable.call(this, {});
    this._output = output;
    var _self = this;
    http.get(url, function(res) {
        res.on('data', function (chunk) {
            _self._write(chunk);
        });
        res.on("end", function() {
            _self._write(new Buffer(0));
        });
    }).on("error", function() {
        throw new Error('download err');
    });
}
DownloadStream.prototype._write = function (chunk, encoding, callback) {
    if(chunk.length == 0) {
        this.push(null);
        this.emit('finish');
    }
    else {
        this._output[0] += chunk.toString();
    }
};

module.exports = DownloadStream;