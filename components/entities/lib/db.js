var Sequelize = require('sequelize');
var path = require("path");
var appRoot = require('app-root-path');
var sequelize = require(appRoot+ '/db');
const db = {};
var AccountPerformanceReportRequest = sequelize.import(path.join(__dirname, '/../AccountPerformanceReportRequest'));
var AdPerformanceReportRequest = sequelize.import(path.join(__dirname, '/../AdPerformanceReportRequest'));
var AdGroupPerformanceReportRequest = sequelize.import(path.join(__dirname, '/../AdGroupPerformanceReportRequest'));
var CallDetailReportRequest = sequelize.import(path.join(__dirname, '/../CallDetailReportRequest'));
var CampaignPerformanceReportRequest = sequelize.import(path.join(__dirname, '/../CampaignPerformanceReportRequest'));
var KeywordPerformanceReportRequest = sequelize.import(path.join(__dirname, '/../KeywordPerformanceReportRequest'));

db[AccountPerformanceReportRequest.name] = AccountPerformanceReportRequest;
db[AccountPerformanceReportRequest.name].associate(db);

db[AdPerformanceReportRequest.name] = AdPerformanceReportRequest;
db[AdPerformanceReportRequest.name].associate(db);

db[AdGroupPerformanceReportRequest.name] = AdGroupPerformanceReportRequest;
db[AdGroupPerformanceReportRequest.name].associate(db);

db[CallDetailReportRequest.name] = CallDetailReportRequest;
db[CallDetailReportRequest.name].associate(db);

db[CampaignPerformanceReportRequest.name] = CampaignPerformanceReportRequest;
db[CampaignPerformanceReportRequest.name].associate(db);

db[KeywordPerformanceReportRequest.name] = KeywordPerformanceReportRequest;
db[KeywordPerformanceReportRequest.name].associate(db);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;