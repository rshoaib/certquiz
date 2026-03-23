const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key) env[key.trim()] = value.join('=').replace(/"/g, '').trim();
});
const url = env['NEXT_PUBLIC_SUPABASE_URL'] + '/rest/v1/blog_posts?slug=eq.comptia-security-plus-study-guide-2026';
const headers = {
  'apikey': env['SUPABASE_SERVICE_ROLE_KEY'],
  'Authorization': 'Bearer ' + env['SUPABASE_SERVICE_ROLE_KEY'],
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function main() {
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ created_at: '2026-03-24T12:00:00.000Z' })
  });
  const data = await res.json();
  console.log(data);
  process.exit(0);
}
main();
