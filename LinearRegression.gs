var LinearRegression = function () {};

LinearRegression.prototype.train = function (x, y, alpha, numIter) {
  if (alpha === undefined) alpha = 0.01;
  if (numIter === undefined) numIter = 100;

  x = U.biased(x);
  var m = x.length;
  var n = x[0].length;

  var theta = U.zeros(n);
  for (var i = 0; i < numIter; i++) {
    var d = N.mul(alpha / m, N.dot(N.transpose(x), N.sub(N.dot(x, theta), y)));
    N.subeq(theta, d);
  }

  this._theta = theta;
};

LinearRegression.prototype.predict = function (x) {
  return N.dot(x, this._theta);
};

LinearRegression.prototype.getTheta = function () {
  return N.clone(this._theta);
};
