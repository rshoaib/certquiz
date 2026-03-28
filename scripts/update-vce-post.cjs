const fs = require('fs');
const path = require('path');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0 && !key.startsWith('#')) {
    env[key.trim()] = value.join('=').replace(/"/g, '').trim();
  }
});

const url = env['NEXT_PUBLIC_SUPABASE_URL'];
const key = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!url || !key) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const restUrl = url + '/rest/v1';
const headers = {
  'apikey': key,
  'Authorization': 'Bearer ' + key,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function updatePost(table, slug, payload) {
  const res = await fetch(`${restUrl}/${table}?slug=eq.${slug}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update Failed: ${res.status} ${text}`);
  }
  
  const data = await res.json();
  if (data.length === 0) {
    console.warn(`⚠️ [${table}] No record found for slug='${slug}'.`);
  } else {
    console.log(`✅ [${table}] Updated successfully for slug='${slug}'.`);
  }
  return data;
}

async function main() {
  try {
    const content = fs.readFileSync(path.join(__dirname, 'free-vce-post.html'), 'utf8');

    const updatePayload = {
      title: 'Free VCE Player Online: Instantly Open Your Exam Files (No Download)',
      description: 'Stop paying $40 for VCE simulators. Our free, browser-based VCE player lets you practice IT certification exams instantly online—no software required and 100% private.',
      content: content,
      // Retain or update other fields as necessary
      category: 'exam-tools'
    };

    await updatePost('blog_posts', 'free-vce-player-online', updatePayload);
  } catch (err) {
    console.error('Fatal Error:', err.message);
  }
}

main();
