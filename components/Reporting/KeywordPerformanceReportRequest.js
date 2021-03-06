module.exports = () => {
    class KeywordPerformanceReportRequest{
            constructor(){
               this.KeywordPerformanceReportColumns= ['KeywordId',
               'AccountId',
               'AccountName',
               'AccountNumber',
               'AccountStatus',
               'AdDistribution',
               'AdGroupId',
               'AdGroupName',
               'AdGroupStatus',
               'AdId',
               'AdRelevance',
               'AdType',
               'Assists',
               'AverageCpc',
               'AveragePosition',
               'BidMatchType',
               'BidStrategyType',
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
               'CurrentMaxCpc',
               'CustomParameters',
               'DeliveredMatchType',
               'DestinationUrl',
               'DeviceOS',
               'DeviceType',
               'ExpectedCtr',
               'FinalAppUrl',
               'FinalMobileUrl',
               'FinalUrl',
               'FirstPageBid',
               //'HistoricalAdRelevance',
               //'HistoricalExpectedCtr',
               //'HistoricalLandingPageExperience',
               //'HistoricalQualityScore',
               'Impressions',
               'Keyword',
               'KeywordLabels',
               'KeywordStatus',
               'LandingPageExperience',
               'Language',
               'Mainline1Bid',
               'MainlineBid',
               'Network',
               'QualityImpact',
               'QualityScore',
               'ReturnOnAdSpend',
               'Revenue',
               'RevenuePerAssist',
               'RevenuePerConversion',
               'Spend',
               'TimePeriod',
               'TopVsOther',
               /*'TrackingTemplate'*/];
               this.name = 'KeywordPerformance';
               this.Aggregation = 'Daily';
              this.columns = {type:'KeywordPerformanceReportColumn', data: this.KeywordPerformanceReportColumns};
              this.Time = {
                    CustomDateRangeStart:{Day:'15',Month:'06',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    }
    return new KeywordPerformanceReportRequest();
}