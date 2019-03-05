var config = {
    db: {'host': 'localhost', 'user': '', 'passwd': '', 'name': '' },
    bing: {
        client_id: '',
        code: '',
        grant_type: 'authorization_code',
        redirect_uri: 'https://login.live.com/oauth20_desktop.srf',
        login_url: 'https://login.live.com/oauth20_token.srf',
        report_services_wsdl: 'https://reporting.api.bingads.microsoft.com/Api/Advertiser/Reporting/v12/ReportingService.svc?wsdl',
        DeveloperToken: '',
        CustomerId: '',
        CustomerAccountId: '',
        
        access_token: '',
        refresh_token: ''

    }
};
module.exports = config;