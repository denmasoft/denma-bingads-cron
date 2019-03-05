module.exports = (sequelize, DataTypes) => {
    const CallDetailReportRequest = sequelize.define('CallDetail', {
        call_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AccountId : {type: DataTypes.INTEGER},
        AccountName : {type: DataTypes.STRING},
        AccountStatus : {type: DataTypes.STRING},
        AdGroupId : {type: DataTypes.INTEGER},
        AdGroupName : {type: DataTypes.STRING},
        AdGroupStatus : {type: DataTypes.STRING},
        AreaCode : {type: DataTypes.STRING},
        CallStatus : {type: DataTypes.STRING},
        CallTypeName : {type: DataTypes.STRING},
        CampaignId : {type: DataTypes.INTEGER},
        CampaignName : {type: DataTypes.STRING},
        CampaignStatus : {type: DataTypes.STRING},
        City : {type: DataTypes.STRING},
        Duration : {type: DataTypes.INTEGER},
        EndTime : {type: DataTypes.DATE},
        StartTime : {type: DataTypes.DATE},
        State : {type: DataTypes.STRING}
    }, { freezeTableName: true });
    CallDetailReportRequest.associate = models => {}
    return CallDetailReportRequest;
};