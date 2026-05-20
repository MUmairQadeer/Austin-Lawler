import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const token = import.meta.env.VITE_SANITY_WRITE_TOKEN || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const isSanityConfigured = !!(projectId && token);

// Only initialize createClient if credentials are provided to prevent browser crashes
export const client = isSanityConfigured
  ? createClient({
      projectId: projectId,
      dataset: dataset,
      useCdn: false, // set to false for real-time updates and bypass CDN cache for submissions
      apiVersion: '2026-05-20',
      token: token,
    })
  : null;
