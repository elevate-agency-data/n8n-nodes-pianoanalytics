# n8n-nodes-pianoanalytics  

This is an n8n community node. It lets you interact with Piano Analytics in your n8n workflows.  

Piano Analytics specializes in digital measurement and analysis, offering solutions for advanced tracking, comprehensive analytics, and actionable insights to enhance marketing performance and ensure regulatory compliance.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.  

[Installation](#installation)  
[Credentials](#credentials)    
[Operations](#operations)   
[Using as a Tool](#using-as-a-tool)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation  

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.  

Alternatively, you can manually install it:  

```sh  
git clone https://github.com/elevate-agency-data/n8n-nodes-pianoanalytics.git 
cd n8n-nodes-pianoanalytics 
npm install  
```  

Then, place the node file in the `~/.n8n/custom-nodes` directory (or follow instructions specific to your n8n installation).   

## Credentials  

To use this node, you need a Piano Analytics API key with access to Piano Analytics.  

## Operations  

This node supports the following operations within Piano Analytics:  

* **Collection API**
    - Sends events directly with the Collection API
* **Extraction API**
    - Gets the data of a query
    - Gets the number of results of a query
    - Gets the total for each metric
* **Measurement API**
    - Sends measurements with the Measurement API

Retrieve information from the [Piano Analytics API](https://developers.atinternet-solutions.com/piano-analytics/). 

## Using as a Tool

This node can be used as a tool in n8n AI Agents. To enable community nodes as tools, you need to set the `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` environment variable to `true`.

### Setting the Environment Variable

**If you're using a bash/zsh shell:**
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
n8n start
```

**If you're using Docker:**
Add to your docker-compose.yml file:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you're using the desktop app:**
Create a `.env` file in the n8n directory:
```
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you want to set it permanently on Mac/Linux:**
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

## Compatibility  

- Tested with: 1.84.1 (Success)

## Resources  

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)  
- [Piano Analytics API documentation](https://developers.atinternet-solutions.com/piano-analytics/)