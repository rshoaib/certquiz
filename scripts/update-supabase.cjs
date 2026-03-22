const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0 && !key.startsWith('#')) {
    env[key.trim()] = value.join('=').replace(/"/g, '').trim();
  }
});

const url = env['NEXT_PUBLIC_SUPABASE_URL'];
const key = env['SUPABASE_SERVICE_ROLE_KEY'];
const restUrl = url + '/rest/v1';
const headers = {
  'apikey': key,
  'Authorization': 'Bearer ' + key,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function main() {
  const content = fs.readFileSync('scripts/update-post.html', 'utf8');

  const res = await fetch(
    `${restUrl}/blog_posts?slug=eq.free-vce-player-online`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        content,
        hero_image: '/images/blog/free-vce-player-online.png',
        description: 'Open VCE files free online — no download, no signup, no $40 fee. CertQuiz is a 100% browser-based VCE player that works on any device. Upload your .vce, .pdf, or .docx exam file and start practicing instantly.'
      })
    }
  );

  if (res.ok) {
    console.log('✅ Article updated in Supabase');
  } else {
    console.error('❌ Update failed:', await res.text());
  }
}

main().catch(e => console.error('Fatal:', e.message));
