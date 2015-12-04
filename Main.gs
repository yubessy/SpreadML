function onOpen() {
  createMenu();
}

function createMenu() {
  SpreadsheetApp.getUi()
    .createMenu('SpreadML')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('SpreadML')
    .setWidth(320);

  SpreadsheetApp.getUi()
    .showSidebar(html);
}

function run() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var dataSheet = ss.getActiveSheet();
  var dataRange = dataSheet.getActiveRange();
  var dataset = U.loadDataset(dataRange);

  var model = new LinearRegression();
  model.train(dataset.training.x, dataset.training.y, 100, 0.01, 1);
  var predictionY = model.predict(dataset.prediction.x);
  var trainingY_ = model.predict(dataset.training.x);

  var values = U.mergeValues(predictionY, dataset.prediction.rowMap, trainingY_, dataset.training.rowMap);
  var resultSheet = ss.insertSheet();
  var resultRange = resultSheet.getRange(1, 1, values.length);
  resultRange.setValues(values);
}
