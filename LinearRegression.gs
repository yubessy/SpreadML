var LinearRegression = function () {};

LinearRegression.prototype.train = function (x, y, numIter, alpha, lambda) {
  if (numIter === undefined) numIter = 100;
  if (alpha === undefined) alpha = 0.01;
  if (lambda === undefined) lambda = 0;

  x = U.biased(x);
  var m = x.length;
  var n = x[0].length;

  var theta = U.zeros(n);
  for (var i = 0; i < numIter; i++) {
    var d = N.dot(N.transpose(x), N.sub(N.dot(x, theta), y));
    if (lambda) {
      var r = N.mul(lambda, theta);
      r[0] = 0;
      N.addeq(d, r);
    }
    N.subeq(theta, N.mul(alpha / m, d));
  }

  this._theta = theta;
};

LinearRegression.prototype.predict = function (x) {
  return N.dot(x, this._theta);
};

LinearRegression.prototype.getTheta = function () {
  return N.clone(this._theta);
};
