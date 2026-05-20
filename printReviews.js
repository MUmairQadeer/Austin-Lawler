import fs from 'fs';
import { createClient } from '@sanity/client';

// Parse .env manually to avoid extra dependencies
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
  try {
    const data = await client.fetch('*');
    console.log("\n==============================================");
    console.log("   ALL DOCUMENTS FOUND IN YOUR DATASET");
    console.log("==============================================");
    if (data.length === 0) {
      console.log("No testimonials found in Sanity database.");
    } else {
      data.forEach((item, index) => {
        console.log(`\n[Testimonial #${index + 1}]`);
        console.log(`ID:      ${item._id}`);
        console.log(`Status:  ${item._id.startsWith('drafts.') ? 'PENDING (Draft)' : 'PUBLISHED'}`);
        console.log(`Name:    ${item.name}`);
        console.log(`Job:     ${item.jobTitle || 'N/A'}`);
        console.log(`Rating:  ${'★'.repeat(item.rating || 0)}`);
        console.log(`Message: "${item.text}"`);
        console.log("----------------------------------------------");
      });
    }
  } catch (err) {
    console.error("Error fetching from Sanity:", err.message);
  }
}

run();
