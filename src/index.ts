import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Parsed resume data
const RESUME = {
	contact: {
		//phone: "",
		//email: "",
		github: 'https://github.com/Mrinank-Bhowmick',
		linkedin: 'https://linkedin.com/in/mrinank-bhowmick',
		website: 'https://www.mrinank-ai.tech',
	},
	education: {
		school: 'Kalinga Institute of Industrial Technology',
		location: 'Bhubaneshwar, IN',
		degree: 'B.Tech in Computer Science and Engineering',
		period: 'Sep 2022 - Sep 2026',
		cgpa: '8.3/10',
	},
	projects: [
		{
			name: 'Verbalize (AI Chatbot as Service)',
			description: 'Built a SaaS for LLM-powered chatbot creation, customization and deployment.',
			liveUrl: 'https://verbalize.mrinank-ai.tech',
			githubRepo: 'https://github.com/Mrinank-Bhowmick/verbalize',
			details: [
				'Optimized chatbot calls with caching, rate limiting, request retries using Cloudflare AI gateway.',
				'Deployed on an edge network with a serverless architecture to ensure responses under 1 second.',
			],
			tech: ['NextJS', 'Hono', 'Cloudflare Workers', 'SQL DB', 'TypeScript'],
		},
		{
			name: 'Toxicity API',
			description: 'API developed to analyze text and detect harmful or abusive language with precision.',
			liveUrl: 'https://toxicity.mrinank-ai.tech',
			githubRepo: 'https://github.com/Mrinank-Bhowmick/toxicity',
			details: ['Technique used - Semantic search on a vector database for each chunk of sentences ensures accurate detection.'],
			tech: ['NextJS', 'Hono', 'Cloudflare Workers', 'Vector Database', 'TypeScript'],
		},
	],
	contributions: [
		{
			project: 'Mastra AI agent framework',
			details: [
				'Added Sarvam AI voice support (TTS & STT) for Indian languages',
				'Integrated open-source voice models via Cloudflare Workers AI provider',
				'Pair programmed to integrate Cloudflare KV support for storage',
				'Added google as a option in Mastra CLI',
			],
			githubRepo: 'https://github.com/mastra-ai/mastra',
		},
		{
			project: 'Mem0',
			details: [
				'Added support for Google as an LLM & embedder in their typescript package.',
				'Added support for Cloudflare as a vector store.',
			],
			githubRepo: 'https://github.com/mem0ai/mem0',
		},
		{
			project: 'OWASP Nettacker',
			details: [
				'Implemented POP3 brute-force modules',
				"Fixed language-library issues to improve tool's user experience",
				'Translated the tool to Bengali',
			],
			githubRepo: 'https://github.com/OWASP/Nettacker',
		},
	],
	skills: {
		languages: ['JavaScript', 'C++', 'Python', 'TypeScript'],
		frameworks: ['Next.js', 'Express/Node.js', 'vercel ai sdk'],
		databases: ['SQL', 'Vector DB'],
		infra: ['Cloudflare', 'AWS'],
	},
	achievements: [
		'1.5k+ github stars on `python-beginner-projects` repository featuring concise, high-impact projects.',
		'Finalist, Google Gen-AI Exchange Hackathon',
		'Finalist, ICDCIT Hackathon',
	],
};

export class ResumeMCP extends McpAgent {
	server = new McpServer({
		name: 'Mrinank-Resume',
		version: '1.0.0',
	});

	async init() {
		// Return the entire resume
		this.server.tool('getAll', async () => ({
			content: [{ type: 'text', text: JSON.stringify(RESUME) }],
		}));

		// Return a single section
		this.server.tool(
			'getSection',
			{ section: z.enum(['contact', 'education', 'projects', 'contributions', 'skills', 'achievements']) },
			async ({ section }) => ({
				content: [{ type: 'text', text: JSON.stringify((RESUME as any)[section]) }],
			})
		);
	}
}

export default {
	fetch(request: Request, env: unknown, ctx: unknown) {
		const url = new URL(request.url);

		if (url.pathname === '/sse' || url.pathname === '/sse/message') {
			// @ts-ignore
			return ResumeMCP.serveSSE('/sse').fetch(request, env, ctx);
		}

		if (url.pathname === '/mcp') {
			// @ts-ignore
			return ResumeMCP.serve('/mcp').fetch(request, env, ctx);
		}

		return new Response('Not found', { status: 404 });
	},
};
