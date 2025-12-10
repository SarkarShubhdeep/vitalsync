import { spawn } from 'child_process';
import { generate } from 'openapi-typescript-codegen';
import path from 'path';

const WAIT_TIMEOUT = 10000;
const API_URL = 'http://localhost:4000';
const DOCS_URL = `${API_URL}/documentation/json`;

async function waitForServer(): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < WAIT_TIMEOUT) {
    try {
      const res = await fetch(API_URL + '/health');
      if (res.ok) return;
    } catch (e) {
      // ignore
    }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Server failed to start');
}

async function main() {
  console.log('Starting server for SDK generation...');
  const server = spawn('bun', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '../../server'),
    env: { ...process.env, SKIP_DB: 'true', PORT: '4000' },
    stdio: 'inherit' // helpful to see server output
  });

  try {
    await waitForServer();
    console.log('Server is ready. Generating SDK...');

    await generate({
      input: DOCS_URL,
      output: path.resolve(__dirname, '../src/generated'),
      httpClient: 'fetch',
      useOptions: true,
      useUnionTypes: true,
      exportSchemas: true,
      exportServices: true,
      clientName: 'VitalsClient'
    });

    console.log('SDK generated successfully!');
  } catch (error) {
    console.error('SDK generation failed:', error);
    process.exit(1);
  } finally {
    console.log('Stopping server...');
    server.kill();
    // process.exit(0); // Let it exit naturally
  }
}

main();
