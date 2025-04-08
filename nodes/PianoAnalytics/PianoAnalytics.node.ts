import { 
	ApplicationError,
	INodeType, 
	INodeTypeDescription, 
	IExecuteFunctions, 
	NodeApiError,
	NodeConnectionType,
	NodeOperationError,
	IRequestOptions
} from 'n8n-workflow';

export class PianoAnalytics implements INodeType {
	description: INodeTypeDescription = {
		name: 'pianoAnalytics',
		displayName: 'Piano Analytics',
		group: ['transform'],
		version: 1,
		description: 'Use the Piano Analytics API',
    defaults:{ name: 'Piano Analytics' },
		icon: 'file:pianoanalytics.svg',
		// @ts-ignore - node-class-description-inputs-wrong
		inputs: [{ type: NodeConnectionType.Main }],
		// @ts-ignore - node-class-description-outputs-wrong
		outputs: [{ type: NodeConnectionType.Main }],        
		usableAsTool: true,
		credentials: [{	name: 'PianoAnalyticsApi', required: true}],
		requestDefaults:{
			baseURL: 'https://api.atinternet.io/v3/data/getData',
			headers:{ 'Content-Type': 'application/json' }
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Collection API', value: 'collectionAPI', description: 'Send events directly with Collection API, from any platform you want' },
					{ name: 'Extraction API', value: 'extractAPI', description: 'Retrieve your fully processed data from Piano Analytics' },
					{ name: 'Measurement API', value: 'measurementAPI', description: 'Send measurements directly with Measurement API, from any platform you want' }
			  ],
				default: 'extractAPI',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['collectionAPI'] } },
				options: [					
					{ name: 'Post Data', value: 'collectionAPIPost', action:'Send events directly with collection API', description: 'Send events directly with collection API' },
				],
				default: 'collectionAPIPost',
			},	
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['extractAPI'] } },
				options: [					
					{ name: 'Get Data', value: 'extractAPIGetData', action:'Get the data of a query', description: 'Get the data of a query' },
					{ name: 'Get Row Count', value: 'extractAPIGetRowCount', action:'Get the number of results of a query', description: 'Get the number of results of a query' },
					{ name: 'Get Total', value: 'extractAPIGetTotal', action:'Get the total for each metric', description: 'Get the total for each metric' },
				],
				default: 'extractAPIGetData',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['measurementAPI'] } },
				options: [					
					{ name: 'Send Measurement', value: 'measurementAPIPost', action:'Send measurements with measurement API', description: 'Send measurements with measurement API' },
				],
				default: 'measurementAPIPost',
			},	  
			{
				displayName: 'Collection Domain',
				name: 'collectDomain',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['collectionAPIPost'] } }
			},  	 
			{
				displayName: 'Path',
				name: 'path',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['collectionAPIPost'] } }
			},	
			{
        displayName: 'Region',
        name: 'region',
        type: 'options',
        default:'eu',
        displayOptions:{ show:{ operation:['measurementAPIPost'] } },
        options:[					
          { name: 'EU', value: 'eu'},
					{ name: 'US', value: 'us'}
        ]
      },  	 
			{
				displayName: 'Site ID',
				name: 'siteId',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['collectionAPIPost'] } }
			},  	 
			{
				displayName: 'Visitor ID',
				name: 'visitorId',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['collectionAPIPost'] } }
			},  
      {
        displayName: 'Events Array',
        name: 'eventsArray',
        type: 'json',
	      default: '{\n	 "events": [\n    {\n      "name": "event.name",\n      "data": {\n        "property": "value",\n        "property2": "value"\n      }\n    }\n  ]\n}',
        displayOptions:{ show:{ operation:['collectionAPIPost'] } }
      },  
      {
        displayName: 'Measurements Array',
        name: 'measurementsArray',
        type: 'json',
	      default: '{\n  "measurements": [\n    {\n      "key": "temperature",\n      "period": "2023-01-01T12:00:00",\n      "values": {\n        "celsius": 25.5,\n        "fahrenheit": 77.9\n      },\n      "properties": {\n        "geo_city": "Paris",\n        "probe": "Siemens"\n      },\n      "site_id": 1245695\n    }\n  ]\n}',
        displayOptions:{ show:{ operation:['measurementAPIPost'] } }
      },			  
			{
				displayName: 'Sites',
				name: 'sites',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['extractAPIGetData', 'extractAPIGetRowCount', 'extractAPIGetTotal'] } }
			}, 		  
			{
				displayName: 'Columns',
				name: 'columns',            
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['extractAPIGetData', 'extractAPIGetRowCount', 'extractAPIGetTotal'] } }
			}, 	
      {
        displayName: 'Period',
        name: 'period',
        type: 'json',
	      default: '{}',
        displayOptions:{ show:{ operation:['extractAPIGetData', 'extractAPIGetRowCount', 'extractAPIGetTotal'] } }
      },				
			{ 
				displayName: 'Sort By',
				name: 'sort',
				type: 'string',
				default: '',
        displayOptions:{ show:{ operation:['extractAPIGetData'] } }
			},  
			{
				displayName: 'Max Results',
				name: 'maxResults',            
				type: 'number',
				default: 50,
        displayOptions:{ show:{ operation:['extractAPIGetData'] } }
			},			  
			{
				displayName: 'Page Number',
				name: 'pageNumber',            
				type: 'number',
				default: 1,
        displayOptions:{ show:{ operation:['extractAPIGetData'] } }
			},	
			{
        displayName: 'Optional Parameters',
        name: 'optionalParameters',
        type: 'collection',
        placeholder: 'Add Parameter',
        default:{},
        displayOptions:{ show:{ operation:['extractAPIGetData', 'extractAPIGetRowCount', 'extractAPIGetTotal'] } },
        options:[					
          { displayName: 'Evolution', name: 'evolution', type: 'json', default: '{}' },
					{ displayName: 'Filter', name: 'filter', type: 'json', default: '{}' },
					{ displayName: 'Options', name: 'options', type: 'json', default: '{}' },
					{ displayName: 'Segment', name: 'segment', type: 'json', default: '{}' },
        ]
      }
		]
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];
		const credentials = await this.getCredentials('PianoAnalyticsApi');
    if (!credentials) { throw new ApplicationError('Missing Piano Analytics API Credentials'); }
		
		const accessKey = credentials.accessKey as string;
    const secretKey = credentials.secretKey as string;
    const APIKey = accessKey + "_" + secretKey;
		
		// Traitement des opérations
		for (let i = 0; i < items.length; i++) {
			try {		        		
        		
       	const operation = this.getNodeParameter('operation', i, '') as string;		
        const resource = this.getNodeParameter('resource', i, '') as string;	
        
        let url = '';
				let headers = {};
				let data = {};
				
				switch (resource) {
					case 'collectionAPI':									
						const collectDomain = this.getNodeParameter('collectDomain', i, '') as string;						
						const path = this.getNodeParameter('path', i, '') as string;						
						const siteId = this.getNodeParameter('siteId', i, '') as string;				
						const visitorId = this.getNodeParameter('visitorId', i, '') as string;	

						url = `https://${collectDomain}/${path}?s=${siteId}&idclient=${visitorId}`;

						headers = {'Content-Type': 'text/plain'};

						const eventsArray = this.getNodeParameter('eventsArray', i) as string;
						data = JSON.parse(eventsArray);	
						break;
					case 'extractAPI':   
						const columns = this.getNodeParameter('columns', i, '') as string;						
						const period = this.getNodeParameter('period', i, '') as string;						
						const sites = this.getNodeParameter('sites', i, '') as string;		

						if (!columns) { throw new ApplicationError('Columns is required'); }
						if (!period) { throw new ApplicationError('Period is required'); }
						if (!sites) { throw new ApplicationError('Site is required'); }			
					
						let requiredParameters : {[k: string]: any} = {
							'columns': columns.split(','),
							'period': JSON.parse(period),
							'space':{
								's': sites.split(',').map(num => parseInt(num, 10))
							}					
						};

						if (operation == 'extractAPIGetData') { 
							const maxResults = this.getNodeParameter('maxResults', i, 50) as number;
							const pageNumber = this.getNodeParameter('pageNumber', i, 1) as number;	
							const sort = this.getNodeParameter('sort', i, '') as string;	

							if (!maxResults) { throw new ApplicationError('Max Results is required'); }
							if (!pageNumber) { throw new ApplicationError('Page Number is required'); }
							if (!sort) { throw new ApplicationError('Sort is required'); }

							requiredParameters['max-results'] = maxResults;
							requiredParameters['page-num'] = pageNumber;
							requiredParameters['sort'] = sort.split(',');
						}						
						
						url = `https://api.atinternet.io/v3/data`;		   

						switch (operation) {
							case 'extractAPIGetData':
								url += `/getData`;
								break;
							case 'extractAPIGetRowCount':
								url += `/getRowCount`;
								break;            
							case 'extractAPIGetTotal':
								url += `/getTotal`;
								break;
							default:
								throw new NodeOperationError(this.getNode(),`Unknown operation:${operation}`);							
						}

						headers = {'Content-Type': 'application/json',	'x-api-key': `${APIKey}`};
						
						const optionalParameters = this.getNodeParameter('optionalParameters', i) as Record<string, any>;
						const parsedParams: Record<string, any> = {};				

						for (const key in optionalParameters) {
							const value = optionalParameters[key];
							
							try {
								parsedParams[key] = (typeof value === "string") ? JSON.parse(value) : value;
							} catch (error) {
								parsedParams[key] = value;
							}
						}

						data = { ...requiredParameters, ...parsedParams };						
					  break;
					case 'measurementAPI':									
						const region = this.getNodeParameter('region', i, '') as string;

						url = `https://analytics-api-${region}.piano.io/import/measurements/v1`;

						headers = {'Content-Type': 'application/json',	'x-api-key': `${APIKey}`};

						const measurementsArray = this.getNodeParameter('measurementsArray', i) as string;
						data = JSON.parse(measurementsArray);	
						break;
					default:
            throw new NodeOperationError(this.getNode(),`Unknown resource:${resource}`);
				}

				const requestOptions: IRequestOptions = {
          url,
          headers,
          method: 'POST',
          body: data
        };

				console.log('url : ' + url)
				console.log('requestOptions : ' + JSON.stringify(requestOptions))

				const responseData = await this.helpers.request(requestOptions);

				if(!!responseData) {
				  returnData.push(JSON.parse(responseData));
				}
				else {
					returnData.push({'Status Code' : '204 No Content'});
				}

			} catch (error) {
        throw new NodeApiError(this.getNode(), {
          message: `Error calling Piano Analytics API: ${error.message}`,
          description: error.stack || 'No stack trace available'
        });
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}