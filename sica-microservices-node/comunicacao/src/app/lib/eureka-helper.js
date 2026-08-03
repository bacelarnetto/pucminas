const eurekaHost = process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || 'localhost';
const eurekaPort = process.env.EUREKA_PORT || '8081';
const hostName = process.env.HOSTNAME || 'localhost';
const ipAddr = process.env.IP_ADDR || hostName;

const servicePath = '/eureka/apps/';
const baseUrl = `http://${eurekaHost}:${eurekaPort}${servicePath}`;

let heartbeat = null;

exports.registerWithEureka = function(appName, PORT) {
    const instanceId = hostName;

    const instance = {
        hostName,
        app: appName,
        ipAddr,
        port: { '$': PORT, '@enabled': 'true' },
        vipAddress: appName,
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    };

    const register = async () => {
        try {
            const response = await fetch(`${baseUrl}${appName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instance }),
            });
            if (response.status === 204) {
                console.log('>> api ' + appName + ' node registered');
                startHeartbeat(appName, instanceId);
            } else {
                console.log('>> registration failed (HTTP ' + response.status + ') for ' + appName + '; retrying in 10s');
                setTimeout(register, 10000);
            }
        } catch (error) {
            console.error('>> registration error for ' + appName + ':', error.message);
            setTimeout(register, 10000);
        }
    };

    const startHeartbeat = (app, id) => {
        if (heartbeat) clearInterval(heartbeat);
        heartbeat = setInterval(() => {
            fetch(`${baseUrl}${app}/${id}`, { method: 'PUT' })
                .then(response => {
                    if (response.status === 404) {
                        console.log('>> instance ' + app + ' expired in eureka; re-registering');
                        register();
                    }
                })
                .catch(error => console.error('>> heartbeat error for ' + app + ':', error.message));
        }, 30000);
    };

    const exitHandler = options => {
        if (options && options.exit) {
            clearInterval(heartbeat);
            fetch(`${baseUrl}${appName}/${instanceId}`, { method: 'DELETE' })
                .catch(() => {})
                .finally(() => process.exit());
        }
    };

    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
    process.on('SIGTERM', exitHandler.bind(null, { exit: true }));

    register();
};
