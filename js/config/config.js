function getJsonConfig(file) {
    var result = null;

    $.ajax({
        url: "/js/config/" + file + ".json",
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
    });

    return result;
}

const authConfig = getJsonConfig("auth_config");
const apiConfig = getJsonConfig("api_config");

if(apiConfig && authConfig && apiConfig.Region === authConfig.Region ) {

    window._config = {
        cognito: {
            userPoolId: authConfig.userPoolId, // e.g. us-east-2_uXboG5pAb
            userPoolClientId: authConfig.userPoolClientId, // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
            region: apiConfig.Region // e.g. us-east-2
        },
        api: {
            invokeUrl: apiConfig.ServiceEndpoint // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
        }
    };

} else {
    console.log(apiConfig);
    console.log(authConfig);
    console.error("Error retrieving config!");
}



