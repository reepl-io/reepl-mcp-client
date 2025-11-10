#!/usr/bin/env node

/**
 * Reepl MCP Client
 * Forwards MCP requests to Reepl's Cloudflare MCP server using API key
 */

const http = require('http');
const https = require('https');
const readline = require('readline');

// Get API key from command line argument
const apiKey = process.argv[2];

if (!apiKey) {
  console.error('Error: API key required. Usage: npx reepl-mcp-client <api-key>');
  process.exit(1);
}

// MCP server URL
const MCP_SERVER_URL = process.env.REEPL_MCP_URL || 'https://mcp.reepl.io';

/**
 * Forward a single MCP request to the server
 */
function forwardRequest(jsonrpcMessage) {
  return new Promise((resolve, reject) => {
    const url = new URL('/mcp', MCP_SERVER_URL);
    url.searchParams.set('key', apiKey);

    const isHttps = url.protocol === 'https:';
    const httpModule = isHttps ? https : http;

    const messageStr = JSON.stringify(jsonrpcMessage);

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(messageStr),
      },
    };

    const req = httpModule.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(messageStr);
    req.end();
  });
}

// Read JSON-RPC messages from stdin line by line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  try {
    const message = JSON.parse(line);
    const response = await forwardRequest(message);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error('Error processing message:', error.message);
  }
});

rl.on('close', () => {
  process.exit(0);
});

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught error:', error.message);
  process.exit(1);
});
