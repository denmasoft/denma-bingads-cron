module.exports = () => {
    class AccountPerformanceReportRequest{
            constructor(){
               this.AccountPerformanceReportColumns= ['AccountId',
               'AccountName', 
               'AccountNumber', 
               'AccountStatus', 
               'AdDistribution', 
               'Assists', 
               'AverageCpc', 
               'AverageCpp', 
               'AveragePosition', 
               /*'BidMatchType', */
               'ClickCalls', 
               'Clicks', 
               'ConversionRate', 
               'Conversions', 
               'CostPerAssist', 
               'CostPerConversion', 
               'Ctr', 
               'CurrencyCode', 
               'DeliveredMatchType', 
               /*'DeviceOS', */
               'DeviceType', 
               'ExactMatchImpressionSharePercent', 
               //'ImpressionLostToAdRelevancePercent', 
               //'ImpressionLostToBidPercent', 
               //'ImpressionLostToBudgetPercent', 
               //'ImpressionLostToExpectedCtrPercent', 
               //'ImpressionLostToRankPercent', 
               'Impressions', 
               //'ImpressionSharePercent', 
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
               'ReturnOnAdSpend', 
               'Revenue', 
               'RevenuePerAssist',
               'RevenuePerConversion',
               'Spend', 
               'TimePeriod',
               /*'TopVsOther '*/];
               this.name = 'AccountPerformance';
               this.Aggregation = 'Daily';
              this.columns = {type:'AccountPerformanceReportColumn', data: this.AccountPerformanceReportColumns};
              this.Time = {
                    CustomDateRangeStart:{Day:'01',Month:'01',Year:'2018'},
                    CustomDateRangeEnd:{Day:'26',Month:'06',Year:'2018'},
                };
            }
    }
    return new AccountPerformanceReportRequest();
}