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
  var firstRow = 2;
  var firstColumn = 1;
  var numRow = dataSheet.getLastRow() - firstRow + 1;
  var numColumn = dataSheet.getLastColumn() - firstRow + 1;
  var dataRange = dataSheet.getRange(firstRow, firstColumn, numRow, numColumn);
  var dataset = U.loadDataset(dataRange.getValues());

  var model = new LinearRegression();
  model.train(dataset.training.x, dataset.training.y, 100, 0.01, 1);
  var predictionY = model.predict(dataset.prediction.x);
  var trainingY_ = model.predict(dataset.training.x);

  var resultSheet = ss.insertSheet(dataSheet.getName() + "_result");
  resultSheet.getRange(1, 1).setValue(dataSheet.getRange(1, 1).getValue());

  var values = U.mergeValues(predictionY, dataset.prediction.idxMap, trainingY_, dataset.training.idxMap);
  var resultRange = resultSheet.getRange(firstRow, 1, numRow);
  resultRange.setValues(values);
}
