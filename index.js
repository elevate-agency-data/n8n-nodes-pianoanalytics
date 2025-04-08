// This file ensures n8n can find and load your nodes and credentials
const { PianoAnalytics } = require('./dist/nodes/PianoAnalytics/PianoAnalytics.node.js');

module.exports = {
	nodeTypes: {
		PianoAnalytics: PianoAnalytics,
	},
	credentialTypes: {
		PianoAnalyticsApi: require('./dist/credentials/PianoAnalyticsApi.credentials.js').PianoAnalyticsApi,
	},
};
