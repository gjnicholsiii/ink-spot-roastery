import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

function extractPage(html: string, key: string) {
  const match = html.match(new RegExp(`"${key}":"([^"]+)"`));
  return match?.[1] ?? '';
}

function mobilePage(pageImage: string, page: string) {
  const isHome = page === 'home';
  const title = page === 'featured' ? 'Featured Writer' : page === 'books' ? 'Books on the Table' : page === 'coffee' ? 'Coffee' : page === 'nook' ? 'The Nook' : 'Ink Spot Roastery';

  const homeSections = `
    <section class="intro">
      <p class="kicker">INK SPOT ROASTERY</p>
      <h1>A neighborhood<br>for readers<br>and writers.</h1>
      <p class="lede">Good coffee. Great books. Original voices. Pull up a chair.</p>
      <div class="actions"><a class="primary" href="#featured">Join the Table</a><a href="/approved-loader.html?p=coffee">Explore the Café</a></div>
    </section>

    <section id="featured" class="feature-card writer">
      <p class="eyebrow">FEATURED WRITER</p>
      <h2>Maya Rowe</h2>
      <p class="serif-quote">“I write to make sense of the quiet things that insist on being seen.”</p>
      <div class="meta-grid"><div><span>FEATURED PIECE</span><strong>The Map We Carry</strong></div><div><span>UPCOMING READING</span><strong>Thursday, May 29 · 7PM</strong></div></div>
      <a href="/approved-loader.html?p=featured">Meet Maya →</a>
    </section>

    <section class="split">
      <article class="feature-card dark"><p class="eyebrow">FEATURED BLEND</p><h3>Quiet Cartographer</h3><p>Morning roast. Mind inspired by Maya Rowe.</p><a href="/approved-loader.html?p=coffee">Meet the blend →</a></article>
      <article class="feature-card burgundy"><p class="eyebrow">BOOKS ON THE TABLE</p><h3>Stories worth slowing down for.</h3><a href="/approved-loader.html?p=books">Browse the Table →</a></article>
    </section>

    <section class="feature-card prompt" id="prompts"><p class="eyebrow">PROMPT OF THE WEEK</p><h3>Write about a door that changed what was possible.</h3><a href="/approved-loader.html?p=home&jump=prompts">Write from it →</a></section>

    <section class="feature-card member" id="member"><p class="eyebrow">MEMBERSHIP</p><h3>Become a regular.</h3><p>More conversation. More stories. Early access to events, coffee, books and special work.</p><a class="primary" href="#member">Become a Member</a></section>

    <section class="feature-card nook"><p class="eyebrow">THE NOOK</p><h3>Where the work gets written.</h3><p>A community of writers. Real places. Real work.</p><a href="/approved-loader.html?p=nook">Explore The Nook →</a></section>
  `;

  const inner = isHome ? homeSections : `
    <section class="intro compact"><p class="kicker">INK SPOT ROASTERY</p><h1>${title}</h1><p class="lede">A literary corner of Ink Spot.</p></section>
    <section class="page-proof"><img src="${pageImage}" alt="${title}"></section>
  `;

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${title} · Ink Spot Roastery</title>
<style>
*{box-sizing:border-box}html{background:#071f1a}body{margin:0;background:#f1e7d2;color:#17251f;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}a{color:inherit;text-decoration:none}.site-header{position:sticky;top:0;z-index:30;height:68px;background:#07362f;color:#f1e7d2;display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #c59a5244}.brand{display:flex;align-items:center;gap:10px;min-width:0}.brand img{width:42px;height:42px;object-fit:contain;background:#efe5cf}.brand-copy strong{display:block;font:700 18px Georgia,serif;letter-spacing:.06em}.brand-copy small{display:block;font-size:7px;letter-spacing:.15em;color:#d2a956;margin-top:3px}.menu-button{width:44px;height:44px;border:1px solid #c59a52;background:#07362f;color:#f1e7d2;border-radius:5px;font-size:25px}.drawer{display:none;position:fixed;z-index:40;inset:68px 0 auto 0;background:#07362f;color:#f1e7d2;padding:10px 20px 24px;box-shadow:0 16px 30px #0007}.drawer.open{display:block}.drawer a{display:block;padding:13px 2px;border-bottom:1px solid #c59a5233;font:17px Georgia,serif}.hero-photo{height:250px;background:#183a33;overflow:hidden;position:relative;border-bottom:1px solid #c59a5255}.hero-photo img{position:absolute;width:760px;max-width:none;height:auto;left:50%;top:-84px;transform:translateX(-50%);filter:saturate(.92) contrast(1.02)}.intro{padding:28px 20px 30px;background:#efe4ce}.intro.compact{padding-bottom:22px}.kicker,.eyebrow{margin:0 0 8px;font-size:10px;letter-spacing:.18em;font-weight:700;color:#8a5b37}.intro h1{margin:0;font:700 42px/0.95 Georgia,serif;color:#163229;letter-spacing:-.025em}.intro.compact h1{font-size:38px;line-height:1}.lede{font:17px/1.5 Georgia,serif;color:#3f453f;margin:16px 0 0}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}.actions a,.primary{display:inline-block;padding:12px 15px;border:1px solid #856535;font-size:13px;font-weight:700}.actions .primary,.primary{background:#0a4a3f;color:#f3e7cf;border-color:#0a4a3f}.feature-card{margin:14px;padding:22px;border:1px solid #c9b897;background:#f6ecd7;box-shadow:0 8px 20px #20352f12}.feature-card h2,.feature-card h3{font-family:Georgia,serif;color:#173128;margin:0 0 10px}.feature-card h2{font-size:34px}.feature-card h3{font-size:26px;line-height:1.05}.feature-card p{line-height:1.5}.serif-quote{font:italic 18px/1.45 Georgia,serif}.feature-card>a:not(.primary){display:inline-block;margin-top:12px;font-weight:700;color:#6e4528}.meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.meta-grid div{border-top:1px solid #bba987;padding-top:10px}.meta-grid span{display:block;font-size:8px;letter-spacing:.12em;color:#7a6c5a;margin-bottom:5px}.meta-grid strong{font:15px/1.25 Georgia,serif}.split{display:grid;grid-template-columns:1fr;gap:0}.dark{background:#0d4a40;color:#f3ead8;border-color:#0d4a40}.dark h3,.dark .eyebrow,.dark a{color:#f3ead8}.burgundy{background:#5d302d;color:#f3ead8;border-color:#5d302d}.burgundy h3,.burgundy .eyebrow,.burgundy a{color:#f3ead8}.prompt{background:#486064;color:#f6ecd7;border-color:#486064}.prompt h3,.prompt .eyebrow,.prompt a{color:#f6ecd7}.member{background:#e5d6b9}.nook{margin-bottom:28px}.page-proof{padding:14px;background:#071f1a}.page-proof img{display:block;width:100%;height:auto;border:1px solid #c59a5244}.site-footer{background:#07362f;color:#d9ccb4;padding:24px 20px 32px;font:12px/1.5 Georgia,serif;text-align:center}.site-footer strong{color:#f1e7d2}.site-footer a{color:#d5aa59} @media(min-width:701px){body{display:none}}
</style></head><body>
<header class="site-header"><a class="brand" href="/approved-loader.html?p=home"><img src="/brand/inkspot-logo.webp" alt="Ink Spot"><span class="brand-copy"><strong>INK SPOT</strong><small>ROASTERY · GREAT STORIES START HERE</small></span></a><button class="menu-button" id="menuButton" aria-label="Open menu">☰</button></header>
<nav class="drawer" id="drawer"><a href="/approved-loader.html?p=home">Home</a><a href="/approved-loader.html?p=featured">Featured Writer</a><a href="/approved-loader.html?p=books">Books on the Table</a><a href="/approved-loader.html?p=home&jump=prompts">Prompts</a><a href="/approved-loader.html?p=nook">The Nook</a><a href="/approved-loader.html?p=coffee">Coffee</a><a href="/approved-loader.html?p=home&jump=member">Membership</a></nav>
${isHome ? `<section class="hero-photo"><img src="${pageImage}" alt="Ink Spot coffeehouse"></section>` : ''}
${inner}
<footer class="site-footer"><strong>Stay in the loop.</strong><br>Thoughtful reads, writing prompts, and café news.<br><br><a href="/approved-loader.html?p=home">INK SPOT ROASTERY</a></footer>
<script>const b=document.getElementById('menuButton'),d=document.getElementById('drawer');b?.addEventListener('click',()=>d?.classList.toggle('open'));const j=new URLSearchParams(location.search).get('jump');if(j)setTimeout(()=>document.getElementById(j)?.scrollIntoView({behavior:'smooth'}),80);</script>
</body></html>`;
}

export async function GET(req: Request) {
  const filePath = path.join(process.cwd(), 'approved-spa-live.html');
  const html = await readFile(filePath, 'utf8');
  const url = new URL(req.url);
  const page = url.searchParams.get('p') || 'home';
  const ua = req.headers.get('user-agent') || '';
  const mobile = /iPhone|Android|Mobile|iPod/i.test(ua);

  if (mobile) {
    const image = extractPage(html, page) || extractPage(html, 'home');
    return new Response(mobilePage(image, page), {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        'vary': 'user-agent'
      }
    });
  }

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate'
    }
  });
}
