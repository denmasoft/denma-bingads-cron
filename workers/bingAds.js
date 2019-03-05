const soap = require('soap');
const appRoot = require('app-root-path');
const config = require(appRoot + '/config');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const _ = require('lodash');
const CronJob = require('cron').CronJob;
var Client = require('node-rest-client').Client;
const fs = require('fs');
const download = require('download');
var yauzl = require("yauzl");
const Json2csvParser = require('json2csv').Parser;
const csvtojson = require('csvtojson');
const csvSplitStream = require('csv-split-stream');
const dbEntities = require(appRoot + '/components/entities');
var sequelize = require(appRoot + '/db');
const decompress = require('decompress');
const CsvSplitter = require('csv-splitter');
//var extract = require('extract-zip');
//var unzip = require('unzip');
var csv = require('csv');
var forEmail=[];
module.exports = (worker) => {
    class BingAds {
        constructor() {
            this.id = worker.id;
            var instance = this;    
            this.AccountPerformanceReportRequest = require(appRoot+ '/components/Reporting/AccountPerformanceReportRequest')();
            this.AccountPerformanceReportRequest.Aggregation = 'Hourly';
            this.AdPerformanceReportRequest = require(appRoot+ '/components/Reporting/AdPerformanceReportRequest')();
            this.AdPerformanceReportRequest.Aggregation = 'Hourly';
            this.AdGroupPerformanceReportRequest = require(appRoot+ '/components/Reporting/AdGroupPerformanceReportRequest')();
            this.AdGroupPerformanceReportRequest.Aggregation = 'Hourly';
            this.CampaignPerformanceReportRequest = require(appRoot+ '/components/Reporting/CampaignPerformanceReportRequest')();
            this.CampaignPerformanceReportRequest.Aggregation = 'Hourly';
            this.KeywordPerformanceReportRequest = require(appRoot+ '/components/Reporting/KeywordPerformanceReportRequest')();
            this.KeywordPerformanceReportRequest.Aggregation = 'Hourly';
            this.CallDetailReportRequest = require(appRoot+ '/components/Reporting/CallDetailReportRequest')();
            this.CallDetailReportRequest.Aggregation = 'Summary';
        }
        async run(customTime, _date){
            forEmail=[];
            console.log('PROCESSING BING ADS FOR DAY: '+_date);
            this.AccountPerformanceReportRequest.Time = customTime;
            this.AdPerformanceReportRequest.Time = customTime;
            this.AdGroupPerformanceReportRequest.Time = customTime;
            this.CampaignPerformanceReportRequest.Time = customTime;
            this.KeywordPerformanceReportRequest.Time = customTime;
            this.CallDetailReportRequest.Time = customTime;
            let KeywordOutcome = await this._run(this.KeywordPerformanceReportRequest, _date);
            let CallOutcome = await this._run(this.CallDetailReportRequest, _date);
            let AccountOutcome = await this._run(this.AccountPerformanceReportRequest, _date);
            let AdOutcome = await this._run(this.AdPerformanceReportRequest, _date);
            let AdGroupOutcome = await this._run(this.AdGroupPerformanceReportRequest, _date);
            let CampaignOutcome = await this._run(this.CampaignPerformanceReportRequest, _date);
            await this.sendMail();
            return true;
        }
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async _getRefreshToken(){
            var client = new Client();
            var args = {
            data: {
                'client_id': config.bing.client_id,
                'code': config.bing.code,
                'grant_type': config.bing.grant_type,
                'redirect_uri':config.bing.redirect_uri
            },
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };
            client.post(config.bing.login_url, args, function (data, response) {
                //console.log(data);
                return data;
            });
        }
        async getRefreshToken(){
            try{
                let data = this._getRefreshToken();
                return data;
            }catch(e){
                console.log(e);
            }
        }

        async _refreshToken(){
            var client = new Client();
            var args = {
            data: {
                'client_id': config.bing.client_id,
                'refresh_token': config.bing.refresh_token,
                'grant_type': 'refresh_token'
            },
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };
            return new Promise((resolve, reject)=>{
                client.post(config.bing.login_url, args, (data, response)=> {
                    //console.log(data);
                    resolve(data);
                });
            })
        }
        async refreshToken(){
            try{
                let data = await this._refreshToken();
                config.bing.refresh_token = data.refresh_token;
                config.bing.access_token = data.access_token;
                let cdata = await fs.readFileSync(appRoot + '/access_token.json', 'utf8');
                let _config = JSON.parse(cdata);
                _config.access_token = data.access_token;
                _config.refresh_token = data.refresh_token;
                let _data = JSON.stringify(_config);
                await fs.writeFileSync(appRoot + '/access_token.json', _data);
                return data;
            }catch(e){
                console.log(e);
            }
        }
        async _createClient(url) {
            var wsdlOptions = {
                envelopeKey:'s'
            };
            return new Promise((resolve, reject) => {
                soap.createClient(url, wsdlOptions,(err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(client);
                    }
                });
            });
        }
        async createClient() {
            try {
                let client = await this._createClient(config.bing.report_services_wsdl);
                return client;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        async generatePollXml(reportId){
            let xml='<PollGenerateReportRequest xmlns="https://bingads.microsoft.com/Reporting/v12">'+
            '<ReportRequestId i:nil="false">'+reportId+'</ReportRequestId>'+
          '</PollGenerateReportRequest>';
          return xml;
        }

        async generateXmlReport(report){
            let type = report.constructor.name;
            let name = report.name;
            let Aggregation = report.Aggregation;
            let columns = report.columns;
            let columnsData = columns.data;
            let columnsDataLength = columnsData.length;
            let columntype = columns.type;
            let _columns='';
            for(let c=0;c<columnsDataLength;c++){
                let _c = columnsData[c];
                _columns+= '<'+columntype+'>'+_c+'</'+columntype+'>'+'\n';
            }
            let time = report.Time;
            let _time='';
            if(typeof time.PredefinedTime!='undefined'){
                _time = '<PredefinedTime i:nil="false">'+time.PredefinedTime+'</PredefinedTime>';
            }
            else{
                _time='<CustomDateRangeEnd i:nil="false">'+
                '<Day>'+time.CustomDateRangeEnd.Day+'</Day>'+
                '<Month>'+time.CustomDateRangeEnd.Month+'</Month>'+
                '<Year>'+time.CustomDateRangeEnd.Year+'</Year>'+
            '</CustomDateRangeEnd>'+
            '<CustomDateRangeStart i:nil="false">'+
                '<Day>'+time.CustomDateRangeStart.Day+'</Day>'+
                '<Month>'+time.CustomDateRangeStart.Month+'</Month>'+
                '<Year>'+time.CustomDateRangeStart.Year+'</Year>'+
            '</CustomDateRangeStart>';
            }
            let xml='<SubmitGenerateReportRequest xmlns="https://bingads.microsoft.com/Reporting/v12">'+
            '<ReportRequest i:nil="false" i:type="'+type+'">'+
                '<ExcludeColumnHeaders i:nil="false">false</ExcludeColumnHeaders>'+
                '<ExcludeReportFooter i:nil="false">true</ExcludeReportFooter>'+
                '<ExcludeReportHeader i:nil="false">true</ExcludeReportHeader>'+
                '<Format i:nil="false">Csv</Format>'+
                '<Language i:nil="false">English</Language>'+
                '<ReportName i:nil="false">'+name+'</ReportName>'+
                '<ReturnOnlyCompleteData i:nil="false">false</ReturnOnlyCompleteData>'+
                '<Aggregation>'+Aggregation+'</Aggregation>'+
              '<Columns i:nil="false">'+
                    _columns+
              '</Columns>'+
              '<Scope i:nil="false">'+
                '<AccountIds i:nil="false" xmlns:a1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                '</AccountIds>'+
              '</Scope>'+
              '<Time i:nil="false">'+
                    _time+
                '<ReportTimeZone i:nil="false">EasternTimeUSCanada</ReportTimeZone>'+
              '</Time>'+
            '</ReportRequest>'+
          '</SubmitGenerateReportRequest>';
          return xml;
        }
        async _SubmitGenerateReport(params) {
            var self = this;
            return new Promise((resolve, reject) => {
                this.soapClient.addSoapHeader({
                    'AuthenticationToken': config.bing.access_token,
                    'DeveloperToken': config.bing.DeveloperToken,
                    'CustomerId': config.bing.CustomerId
                });
                this.soapClient.SubmitGenerateReport(params, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        async SubmitGenerateReport(report) {
            let outputXml = await this.generateXmlReport(report);
            try {
                let xml={
                    _xml: outputXml
                };
                this.soapClient = await this.createClient();
                let result = await this._SubmitGenerateReport(xml);
                return result;
            } catch (error) {
                console.log(error);
            }
        }

        async _PollGenerateReportRequest(params) {
            var self = this;
            return new Promise((resolve, reject) => {
                this.soapClient.PollGenerateReport(params, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        async PollGenerateReportRequest(params) {
            var self = this;
            let outputXml = await this.generatePollXml(params);
            let xml={
                _xml: outputXml
            };
            let result = await this._PollGenerateReportRequest(xml);
            return result;
        }
        async _downloadUrl(url,reportId){
            try{
                let downloaddata = await download(url);
                await fs.writeFileSync(appRoot+'/reports/'+reportId+'.zip', downloaddata);
                return true;
            }catch(e){
                console.log(e);
                throw new Error(e);
            }
        }
        async ReportDownloadUrl(url,reportId){
            if(url==null || typeof url=='undefined') return false;
            try{
                let result = await this._downloadUrl(url,reportId);
                return result;
            }catch(e){
                console.log(e);
                throw new Error(e);
            }
        }
        async _extractReport(reportId, dbname, columns){
            var self = this;
            return new Promise((resolve, reject) => {
                yauzl.open(appRoot+'/reports/'+reportId+'.zip',(err, zipfile)=>{
                    if (err) throw err;
                    zipfile.on("error", function(err) {
                      throw err;
                    });
                    zipfile.on("entry", function(entry) {
                      zipfile.openReadStream(entry,(err, readStream)=>{
                        if (err) throw err;
                        var ws = fs.createWriteStream(appRoot+'/reports/'+reportId+'.csv');
                        readStream.pipe(ws);
                        ws.on('finish', function() {
                            self.readCsv(reportId, dbname, columns);
                          });
                        resolve(readStream);
                      });
                    });
                  });
            });
        }
        async _processStream(readStream){
            return new Promise((resolve, reject)=>{
                readStream.on('data',(data)=>{
                    resolve(data);
                })
            })
        }
        async extractReport(reportId, dbname, columns){
            try{
                await this._extractReport(reportId, dbname, columns);    
            }catch(e){
                console.error(e);
            }
            
        }
        async _processLargeCsv(reportId){
            return await csvSplitStream.split(
              fs.createReadStream(appRoot+'/reports/'+reportId+'.csv'),
              {
                lineLimit: 1500
              },
              (index) => fs.createWriteStream(appRoot+'/reports/'+reportId+`_${index}.csv`)
            ).then(csvSplitResponse => {
                  return csvSplitResponse.totalChunks;
                }).catch(csvSplitError => {
                  console.error('csvSplitStream failed!', csvSplitError);
                });
        }
        async processLargeCsv(reportId){
            let response = await this._processLargeCsv(reportId);//
            return response;
        }
        async prepareValues(arrayChunk, dbname){
            for(let k=0; k<arrayChunk.length; k++){
                let _rec = arrayChunk[k];
                let indexes = Object.keys(_rec);
                for(let j=0;j<indexes.length;j++){
                    let index = indexes[j];
                    if(typeof _rec[index]=='undefined' || _rec[index]==''){
                        _rec[index] = null;
                    }
                    if(index=='StartTime' && dbname=='CallDetail'){
                        _rec[index] = moment(_rec[index],'MM/DD/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
                    }                        
                    if(index=='EndTime' && dbname=='CallDetail'){
                        _rec[index] = moment(_rec[index],'MM/DD/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
                    }
                }
                arrayChunk[k] = _rec;
            }
            return arrayChunk;
        }
        async bulkCreate(dbname, _records){
            let arrayLength = _records.length;
            let chunk = 1500;
            let offset = 0;
            while(offset < arrayLength){
                let arrayChunk = _records.slice(offset, offset + chunk);
                arrayChunk = await this.prepareValues(arrayChunk, dbname);
                await dbEntities.db[dbname].bulkCreate(arrayChunk,{ ignoreDuplicates: true });
                await this.delay(3000);
                offset = offset + chunk;
            }
        }
        async clearToday(dbname, today){
            //let _dbname = dbname.replace('ReportRequest','');
            let field = 'timestamp';
            if(dbname=='CallDetail'){
                field = 'StartTime';   
            }
            await sequelize.query("delete from "+dbname+" where date_format("+field+",'%Y-%m-%d')='"+today+"'");
            console.log('Records from day '+today+' and report '+dbname+' deleted');
        }
        async importCsv(report_file, dbname){
            let _records = await csvtojson().fromFile(report_file, 'utf8');
            let totalSpend = 0;
            for (let s = _records.length - 1; s >= 0; s--) {
                totalSpend = parseFloat(totalSpend) + parseFloat(_records[s].Spend);
            }
            await this.bulkCreate(dbname, _records);
            await this.delay(3000);
            return totalSpend;
        }
         async readCsv(reportId, dbname){
            let readResult = {'totalSpend':0,'totalRecords':0};
            let totalChunks = await this.processLargeCsv(reportId);
            let totalRecords = 0;
            let totalSpend = 0;//
            for (var i = totalChunks - 1; i >= 0; i--) {
                    let report_file = appRoot+'/reports/'+reportId+'_'+i+'.csv';
                    let ctotal = await this.importCsv(report_file, dbname);
                    totalSpend += parseFloat(ctotal);
                    await fs.unlinkSync(report_file);//
                }
            readResult.totalSpend = totalSpend;
            readResult.totalRecords = totalRecords;
            return readResult;
        }
        async processReport(reportId){
            let result = await this.PollGenerateReportRequest(reportId);
            let ReportRequestStatus = result.ReportRequestStatus;
            while(ReportRequestStatus.Status=='Pending'){
                result = await this.PollGenerateReportRequest(reportId);
                ReportRequestStatus = result.ReportRequestStatus;
            }
            return ReportRequestStatus;    
        }
        async submitReport(ReportRequest, _date){
            await this.refreshToken();
            let data = await this.SubmitGenerateReport(ReportRequest);
            let ReportRequestId = typeof data!='undefined'? data.ReportRequestId: null;
            return ReportRequestId;
        }
        async unzipReport(reportId){
            try{
                await decompress(appRoot+'/reports/'+reportId+'.zip', 'reports/');
                await this.delay(10000);
                return true;    
            }catch(e){
                console.log(e);
                throw new Error(e)
            }            
        }
        async updateReportTimestamp(dbname, _date){
            if(dbname!='CallDetail'){
                    await sequelize.query("update "+dbname+" set timestamp=str_to_date(substring(TimePeriod,1,locate(' ',TimePeriod)-1),'%m/%d/%Y') where  date_format(str_to_date(substring(TimePeriod,1,locate(' ',TimePeriod)-1),'%m/%d/%Y'),'%Y-%m-%d')='"+_date+"';", { type: sequelize.QueryTypes.UPDATE});    
                    await this.delay(10000);
            }
        }
        async sendMail(){
            var client = new Client();
            var Header = {
                headers: {"Content-Type": "application/json"},
                data: {'subject': 'Bing Reports', 'message':JSON.stringify(forEmail)}
              };
            try{
                console.log('SENDING EMAIL....');
                return new Promise((resolve, reject) => {
                client.post('https://script.google.com/macros/s/AKfycbwViLZlxDYNCptGq7WawNp_mLkEXeG4bgvMW2HD8J1xpBqqAHfl/exec', Header, (data, response)=>{
                    resolve(data);
                    });
                });
            }catch(e){
                console.log(e);
            }
        }
        async _run(ReportRequest, _date){
            let dbname = ReportRequest.constructor.name;
            let readResult = {};
            dbname = dbname.replace('ReportRequest','');
            let ReportRequestId = await this.submitReport(ReportRequest, _date);
            if(ReportRequestId!=null){
               let ReportRequestStatus = await this.processReport(ReportRequestId); 
               if(typeof ReportRequestStatus.ReportDownloadUrl!='undefined' && ReportRequestStatus.ReportDownloadUrl!=null){
                    let downloadResult = await this.ReportDownloadUrl(ReportRequestStatus.ReportDownloadUrl,ReportRequestId);
                    if(downloadResult!=false){
                        await this.clearToday(dbname, _date);//
                        let uncompress = await this.unzipReport(ReportRequestId);
                        readResult = await this.readCsv(ReportRequestId, dbname);
                        await this.updateReportTimestamp(dbname, _date);
                        await fs.unlinkSync(appRoot+'/reports/'+ReportRequestId+'.csv');
                        await fs.unlinkSync(appRoot+'/reports/'+ReportRequestId+'.zip');    
                    }
                } 
           }
            console.log('total '+dbname+' Spend for day: '+_date+': '+readResult.totalSpend); 
            forEmail.push({'Report': dbname,'date': _date,'Spend': readResult.totalSpend});           
            await this.delay(15000);
        }
    }
    return new BingAds(worker);
};