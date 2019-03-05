module.exports = () => {
    class CallDetailReportRequest{
            constructor(){
                this.CallDetailReportColumns = ['AccountId', 'AccountName', 'AccountStatus', 'AdGroupId', 'AdGroupName',
                 'AdGroupStatus', 'AreaCode', 'CallStatus','CallTypeName','CampaignId','CampaignName','CampaignStatus',
                 'City','Duration','EndTime','StartTime','State'];
                this.name = "CallDetails";
                this.Aggregation='Summary';
                this.columns = {type:'CallDetailReportColumn', data: this.CallDetailReportColumns};
                this.Time= {
                    CustomDateRangeStart:{Day:'01',Month:'01',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    };
    return new CallDetailReportRequest();
}