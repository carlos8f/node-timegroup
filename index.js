var Bucket = require('./lib/bucket')
  , BucketSize = require('./lib/bucket-size')

module.exports = function timebucket () {
  var args = [].slice.call(arguments);
  var size = 'ms';
  var value;
  var bucketStr;
  args.forEach(function (arg) {
    if (typeof arg === 'string') {
      if (arg.match(Bucket.regex)) {
        bucketStr = arg;
      }
      else if (arg.match(BucketSize.regex)) {
        size = arg;
      }
    }
    else if (typeof arg === 'number') {
      value = arg;
    }
    else if (arg instanceof Date) {
      value = arg.getTime();
    }
  });
  if (bucketStr) return Bucket.fromString(bucketStr);
  if (typeof value === 'undefined') {
    return new Bucket('ms', (new Date()).getTime()).resize(size);
  }
  return new Bucket(size, value);
};
