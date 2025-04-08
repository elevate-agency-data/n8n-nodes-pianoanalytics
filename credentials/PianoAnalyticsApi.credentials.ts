import { 
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class PianoAnalyticsApi implements ICredentialType {
	name = 'pianoAnalyticsApi';
	displayName = 'Piano Analytics API';
	documentationUrl = 'https://developers.atinternet-solutions.com/piano-analytics/';
  icon: Icon = 'file:icons/pianoanalytics.svg';
	properties: INodeProperties[] = [
    {
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			required: true,
			description: 'Access Key for the Piano Analytics API'
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			required: true,
			description: 'Secret Key for the Piano Analytics API'
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
        'Content-Type': 'application/json',	
				'x-api-key': '={{$credentials.accessKey + "_" + $credentials.secretKey}}'
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.atinternet.io/v3/data/getData',
			url: '',
		},
	};
}
