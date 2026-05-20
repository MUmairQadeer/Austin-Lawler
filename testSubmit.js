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

async function testSubmit() {
  const newDoc = {
    _type: 'testimonial',
    _id: `drafts.${Date.now()}`,
    name: 'Test Submission from API',
    jobTitle: 'Tester',
    rating: 5,
    text: 'This is a test submission directly using the Sanity client to see if it saves.',
    date: new Date().toLocaleDateString()
  };

  try {
    console.log("Attempting to create document...");
    const res = await client.create(newDoc);
    console.log("SUCCESS! Document created:", res._id);
  } catch (err) {
    console.error("FAILED to create document:", err.message);
  }
}

testSubmit();
