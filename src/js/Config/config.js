export default class Config {

    constructor(userPoolId, userPoolClientId, region, serviceEndpoint, iotEndpoint) {
        this._config = {
            cognito: {
                userPoolId: userPoolId, // e.g. us-east-2_uXboG5pAb
                userPoolClientId: userPoolClientId, // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
                region: region // e.g. us-east-2
            },
            api: {
                invokeUrl: serviceEndpoint // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
            },
            iot: {
                endpointUrl: iotEndpoint
            }
        };
    };

    getInvokeUrl() {
        return this._config.api.invokeUrl;
    }

    getUserPoolId() {
        return this._config.cognito.userPoolId;
    }

    getUserPoolClientId() {
        return this._config.cognito.userPoolClientId;
    }

    getRegion() {
        return this._config.cognito.region;
    }

}