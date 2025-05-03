# MCV - MCP Server for CV/Resume

This project provides a template for serving your CV/Resume data via the Model Context Protocol (MCP), powered by Cloudflare Workers and Durable Objects. It allows AI agents or other services(Claude desktop,clients etc) to interact with your resume data.

## Features

- **MCP Server:** Exposes resume data through standard MCP endpoints.
- **Cloudflare Workers:** Runs serverlessly on Cloudflare's edge network for low latency.
- **Durable Objects:** Utilizes Durable Objects for managing the MCP agent state.
- **Structured Data:** Serves resume data structured in JSON format.
- **Specific Data Retrieval:** Allows fetching the entire resume or specific sections like contact info, education, projects, etc.

### Prerequisites

- Cloudflare account

## Technologies Used

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Model Context Protocol (MCP) SDK](https://github.com/modelcontext/protocol)
- [TypeScript](https://www.typescriptlang.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
