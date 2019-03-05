module.exports = (sequelize, DataTypes) => {
    const KeywordPerformanceReportRequest = sequelize.define('KeywordPerformance', {
        Keyword_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        KeywordId: {type: DataTypes.INTEGER},
        AccountId : {type: DataTypes.INTEGER},
        AccountName : {type: DataTypes.STRING},
        AccountNumber : {type: DataTypes.STRING},
        AccountStatus : {type: DataTypes.STRING},
        AdDistribution : {type: DataTypes.STRING},
        AdGroupId : {type: DataTypes.INTEGER},
        AdGroupName : {type: DataTypes.STRING},
        AdGroupStatus : {type: DataTypes.STRING},
        AdId : {type: DataTypes.INTEGER},
        AdRelevance : {type: DataTypes.STRING},
        AdType : {type: DataTypes.STRING},
        Assists : {type: DataTypes.INTEGER},
        AverageCpc : {type: DataTypes.FLOAT},
        AveragePosition : {type: DataTypes.STRING},
        BidMatchType : {type: DataTypes.STRING},
        BidStrategyType : {type: DataTypes.STRING},
        CampaignId : {type: DataTypes.INTEGER},
        CampaignName : {type: DataTypes.STRING},
        CampaignStatus : {type: DataTypes.STRING},
        Clicks : {type: DataTypes.STRING},
        ConversionRate : {type: DataTypes.STRING},
        Conversions : {type: DataTypes.INTEGER},
        CostPerAssist : {type: DataTypes.FLOAT},
        CostPerConversion : {type: DataTypes.FLOAT},
        Ctr : {type: DataTypes.STRING},
        CurrencyCode : {type: DataTypes.STRING},
        CurrentMaxCpc : {type: DataTypes.STRING},
        CustomParameters : {type: DataTypes.STRING},
        DeliveredMatchType : {type: DataTypes.STRING},
        DestinationUrl : {type: DataTypes.STRING},
        DeviceOS : {type: DataTypes.STRING},
        DeviceType : {type: DataTypes.STRING},
        ExpectedCtr : {type: DataTypes.STRING},
        FinalAppUrl : {type: DataTypes.STRING},
        FinalMobileUrl : {type: DataTypes.STRING},
        FinalUrl : {type: DataTypes.STRING},
        FirstPageBid : {type: DataTypes.STRING},
        //HistoricalAdRelevance : {type: DataTypes.STRING},
        //HistoricalExpectedCtr : {type: DataTypes.STRING},
       // HistoricalLandingPageExperience : {type: DataTypes.STRING},
        //HistoricalQualityScore : {type: DataTypes.STRING},
        Impressions : {type: DataTypes.INTEGER},
        Keyword : {type: DataTypes.STRING},
        KeywordLabels : {type: DataTypes.STRING},
        KeywordStatus : {type: DataTypes.STRING},
        LandingPageExperience : {type: DataTypes.STRING},
        Language : {type: DataTypes.STRING},
        Mainline1Bid : {type: DataTypes.INTEGER},
        MainlineBid : {type: DataTypes.INTEGER},
        Network : {type: DataTypes.STRING},
        QualityImpact : {type: DataTypes.INTEGER},
        QualityScore : {type: DataTypes.INTEGER},
        ReturnOnAdSpend : {type: DataTypes.FLOAT},
        Revenue : {type: DataTypes.STRING},
        RevenuePerAssist : {type: DataTypes.FLOAT},
        RevenuePerConversion : {type: DataTypes.FLOAT},
        Spend : {type: DataTypes.INTEGER},
        TimePeriod : {type: DataTypes.STRING},
        TopVsOther : {type: DataTypes.STRING},
        //TrackingTemplate : {type: DataTypes.STRING}
    }, { freezeTableName: true });
    KeywordPerformanceReportRequest.associate = models => {}
    return KeywordPerformanceReportRequest;
};