module.exports = () => {
    class CampaignPerformanceReportRequest{
            constructor(){
               this.CampaignPerformanceReportColumns= ['CampaignId',
               'AccountId',
               'AccountName',
               'AccountNumber',
               'AccountStatus',
               'AdDistribution',
               'AdRelevance',
               'Assists',
               'AverageCpc',
               'AverageCpp',
               'AveragePosition',
               /*'BidMatchType',*/
               //'BudgetAssociationStatus',
               /*'BudgetName',
               'BudgetStatus',*/
               'CampaignLabels',
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
               'LowQualityClicks',
               'LowQualityClicksPercent',
               'LowQualityConversionRate',
               'LowQualityConversions',
               'LowQualityGeneralClicks',
               'LowQualityImpressions',
               'LowQualityImpressionsPercent',
               'LowQualitySophisticatedClicks',
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
               'TimePeriod',
               /*'TopVsOther',*/
               /*'TrackingTemplate'*/];
               this.name = 'CampaignPerformance';
               this.Aggregation = 'Daily';
              this.columns = {type:'CampaignPerformanceReportColumn', data: this.CampaignPerformanceReportColumns};
              this.Time = {
                    CustomDateRangeStart:{Day:'01',Month:'01',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    }
    return new CampaignPerformanceReportRequest();
}