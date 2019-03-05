module.exports = () => {
    class AdGroupPerformanceReportRequest{
            constructor(){
               this.AdGroupPerformanceReportColumns= ['AdGroupId',
               'AccountId',
               'AccountName',
               'AccountNumber',
               'AccountStatus',
               'AdDistribution',
               'AdGroupLabels',
               'AdGroupName',
               'AdRelevance',
               'Assists',
               'AverageCpc',
               'AverageCpp',
               'AveragePosition',
               /*'BidMatchType',*/
               'CampaignId',
               'CampaignName',
               'CampaignStatus',
               'ClickCalls',
               'Clicks',
               'ConversionRate',
               'Conversions',
               'CostPerAssist',
               'CostPerConversion',
               'Ctr',
               'CurrencyCode',
               'CustomParameters',
               'DeliveredMatchType',
               /*'DeviceOS',*/
               'DeviceType',
               //'ExactMatchImpressionSharePercent',
               'ExpectedCtr',
               //'HistoricalAdRelevance',
               //'HistoricalExpectedCtr',
               //'HistoricalLandingPageExperience',
               //'HistoricalQualityScore',
               //'ImpressionLostToAdRelevancePercent',
               //'ImpressionLostToBidPercent',
               //'ImpressionLostToBudgetPercent',
               //'ImpressionLostToExpectedCtrPercent',
               //'ImpressionLostToRankPercent',
               'Impressions',
               //'ImpressionSharePercent',
               'LandingPageExperience',
               'Language',
               'ManualCalls',
               'Network',
               'PhoneCalls',
               'PhoneImpressions',
               'Ptr',
               'QualityScore',
               'ReturnOnAdSpend',
               'Revenue',
               'RevenuePerAssist',
               'RevenuePerConversion',
               'Spend',
               'Status',
               'TimePeriod',
               //'TopVsOther',
               /*'TrackingTemplate'*/];
               this.name = 'AdGroupPerformance';
               this.Aggregation = 'Daily';
              this.columns = {type:'AdGroupPerformanceReportColumn', data: this.AdGroupPerformanceReportColumns};
              this.Time = {
                    CustomDateRangeStart:{Day:'01',Month:'05',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    }
    return new AdGroupPerformanceReportRequest();
}