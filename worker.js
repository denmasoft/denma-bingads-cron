const SCWorker = require('socketcluster/scworker');
const serveStatic = require('serve-static');
const path = require('path');
const config = require('./config');
const appRoot = require('app-root-path');
const moment = require('moment-timezone');
const express = require('express');
const CronJob = require('cron').CronJob;
class Worker extends SCWorker {

    delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    async run() {
        var BingAds = require(appRoot + '/workers/bingAds')(this);
        /*let _dt = moment('2018-08-01');//
        let customTime = {CustomDateRangeEnd:{'Day':'14','Month':'08','Year':'2018'},
                          CustomDateRangeStart:{'Day':'02','Month':'08','Year':'2018'}};
        console.log(customTime);                          
        let logs = await BingAds.run(customTime, _dt.format('YYYY-MM-DD'));
        return;//*/
        var bingjob = new CronJob({
            cronTime: '00 */5 * * * *',//
            onTick: async function() {
                bingjob.stop();
                let _dt = moment().tz("America/New_York");
                let customTime = {CustomDateRangeEnd:{'Day':_dt.format('DD'),'Month':_dt.format('MM'),'Year':_dt.format('YYYY')},
                          CustomDateRangeStart:{'Day':_dt.format('DD'),'Month':_dt.format('MM'),'Year':_dt.format('YYYY')}};
                let logs = await BingAds.run(customTime, _dt.format('YYYY-MM-DD'));
                bingjob.start();
            },
            start: false,
            timeZone: 'America/New_York'
        });
        bingjob.start();
        new CronJob('00 00 03 * * 1-7', async function() {
            bingjob.stop();
            let _dt = moment().subtract(1, 'day').tz("America/New_York");
            let customTime = {CustomDateRangeEnd:{'Day':_dt.format('DD'),'Month':_dt.format('MM'),'Year':_dt.format('YYYY')},
                              CustomDateRangeStart:{'Day':_dt.format('DD'),'Month':_dt.format('MM'),'Year':_dt.format('YYYY')}};
            console.log('FIX YESTERDAY DATA '+_dt.format('YYYY-MM-DD'));
            await BingAds.run(customTime, _dt.format('YYYY-MM-DD'));
            bingjob.start();
        }, null, true, 'America/New_York');        
        console.log('   >> Worker PID:', process.pid);
    }
}
new Worker();