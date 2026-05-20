import fs from 'fs';
import { createClient } from '@sanity/client';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    if (key && !key.startsWith('#')) {
      env[key] = value;
    }
  }
});

const client = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2026-05-20',
  token: env.VITE_SANITY_WRITE_TOKEN
});

async function run() {
  const qAll = '*[_type == "testimonial"]';
  const dataPub = await client.fetch(qAll); // default perspective
  console.log(`Default (published only) count: ${dataPub.length}`);
}

run();
