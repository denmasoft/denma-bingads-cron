module.exports = () => {
    class AdPerformanceReportRequest{
            constructor(){
               this.AdPerformanceReportColumns= ['AdId', 
               'AccountId', 
               'AccountName', 
               'AccountNumber', 
               'AccountStatus', 
               'AdDescription', 
               'AdDistribution', 
               'AdGroupId', 
               'AdGroupName', 
               'AdGroupStatus', 
               'AdLabels', 
               'AdStatus', 
               'AdTitle', 
               'AdType', 
               'Assists', 
               'AverageCpc', 
               'AveragePosition', 
               'BidMatchType', 
               'BusinessName', 
               'CampaignId', 
               'CampaignName', 
               'CampaignStatus', 
               'Clicks', 
               'ConversionRate', 
               'Conversions', 
               'CostPerAssist', 
               'CostPerConversion', 
               'Ctr', 
               'CurrencyCode', 
               'CustomParameters', 
               'DeliveredMatchType', 
               'DestinationUrl', 
               'DeviceOS', 
               'DeviceType', 
               'DisplayUrl', 
               'FinalAppUrl', 
               'FinalMobileUrl', 
               'FinalUrl', 
               'Headline', 
               'Impressions', 
               'Language', 
               'LongHeadline', 
               'Network', 
               'Path1', 
               'Path2', 
               'ReturnOnAdSpend', 
               'Revenue', 
               'RevenuePerAssist', 
               'RevenuePerConversion', 
               'Spend', 
               'TimePeriod', 
               'TitlePart1', 
               'TitlePart2', 
               'TopVsOther'/*, 
            'TrackingTemplate '*/];
               this.name = 'AdPerformance';
               this.Aggregation = 'Daily';
              this.columns = {type:'AdPerformanceReportColumn', data: this.AdPerformanceReportColumns};
              this.Time = {
                    CustomDateRangeStart:{Day:'01',Month:'06',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    }
    return new AdPerformanceReportRequest();
}