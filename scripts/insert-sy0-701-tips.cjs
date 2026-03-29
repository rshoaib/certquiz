const fs = require('fs');

// Parse .env.local
const envPath = '.env.local';
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

async function safeInsert(table, payload, conflictField) {
  // Check for existing
  const existing = await fetch(`${restUrl}/${table}?select=${conflictField}`, { headers });
  const rows = await existing.json();
  
  if (Array.isArray(rows) && rows.some(r => r[conflictField] === payload[conflictField])) {
    console.log(`❌ [${table}] Record with ${conflictField}='${payload[conflictField]}' already exists.`);
    return null;
  }

  const res = await fetch(`${restUrl}/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Insert Failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  console.log(`✅ [${table}] Inserted successfully.`);
  return data;
}

async function main() {
  try {
    const content = fs.readFileSync('scripts/post.html', 'utf8');

    const article = {
      slug: 'sy0-701-exam-tips-pass-first-try',
      title: '7 Proven CompTIA Security+ (SY0-701) Exam Tips to Pass Your First Try',
      description: 'Struggling with PBQs or wordy scenarios? Discover 7 actionable exam day tips to beat the CompTIA Security+ SY0-701 format and pass on your first attempt without buying expensive simulators.',
      hero_image: '/images/blog/sy0-701-exam-tips-hero.png',
      content: content,
      category: 'certification-guides',
      tags: ['security+', 'comptia', 'sy0-701', 'exam-tips', 'certification', '2026'],
      author: 'CertQuiz Team',
      published: true
    };

    await safeInsert('blog_posts', article, 'slug');
  } catch (err) {
    console.error('Fatal Error:', err.message);
  }
}

main();
