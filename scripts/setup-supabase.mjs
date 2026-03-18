/**
 * Setup script: Creates the blog_posts table in Supabase
 * Run with: node scripts/setup-supabase.mjs
 */

const SUPABASE_URL = 'https://reychjcsslcypdjsbfqe.supabase.co';

// Read anon key from .env.local
import { readFileSync } from 'fs';
const envContent = readFileSync('.env.local', 'utf-8');
const anonKey = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

if (!anonKey) {
  console.error('Could not read SUPABASE_ANON_KEY from .env.local');
  process.exit(1);
}

// First, check if blog_posts table exists by trying to query it
async function checkTable() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id&limit=1`, {
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
    },
  });
  return { status: res.status, data: await res.json() };
}

async function main() {
  console.log('Checking if blog_posts table exists...');
  
  const result = await checkTable();
  
  if (result.status === 200) {
    console.log('✅ blog_posts table exists!');
    console.log('Current rows:', JSON.stringify(result.data, null, 2));
  } else if (result.status === 404 || (result.data?.message && result.data.message.includes('does not exist'))) {
    console.log('❌ blog_posts table does NOT exist yet.');
    console.log('Response:', JSON.stringify(result.data));
    console.log('\nPlease create the table using the SQL below in Supabase SQL Editor:');
    console.log('---');
    console.log(getSQL());
  } else {
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
  }
}

function getSQL() {
  return `
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  hero_image TEXT,
  category TEXT DEFAULT 'certification',
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'CertQuiz Team',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);
`;
}

main().catch(console.error);
