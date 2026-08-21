import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-dynamic';

const header = `
<style>
  .brand-cover,
  .mobile-menu-btn,
  .mobile-menu-panel,
  .hot[style*="top:0"] { display:none !important; }

  .inkspot-real-header{
    position:absolute;
    z-index:100;
    top:0;
    left:50%;
    transform:translateX(-50%);
    width:min(100%,1448px);
    height:73px;
    background:#07362f;
    color:#f1e7d2;
    display:flex;
    align-items:center;
    gap:22px;
    padding:0 28px;
    border-bottom:1px solid rgba(197,154,82,.28);
    line-height:1;
    font-family:Arial,Helvetica,sans-serif;
  }
  .inkspot-brand{
    display:flex;
    align-items:center;
    gap:12px;
    min-width:250px;
    text-decoration:none;
    color:#f1e7d2;
  }
  .inkspot-brand img{
    width:44px;
    height:44px;
    object-fit:contain;
  }
  .inkspot-brand-copy strong{
    display:block;
    font:700 21px/1 Georgia,serif;
    letter-spacing:.07em;
  }
  .inkspot-brand-copy small{
    display:block;
    margin-top:5px;
    color:#d0a552;
    font-size:7px;
    letter-spacing:.18em;
  }
  .inkspot-nav{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:22px;
    flex:1;
    min-width:0;
    height:100%;
  }
  .inkspot-nav a{
    height:100%;
    display:flex;
    align-items:center;
    color:#eee1c8;
    text-decoration:none;
    white-space:nowrap;
    font-size:12px;
    border-bottom:2px solid transparent;
  }
  .inkspot-nav a:hover,
  .inkspot-nav a:focus-visible{
    color:#d5aa59;
    border-bottom-color:#d5aa59;
  }
  .inkspot-actions{
    display:flex;
    align-items:center;
    gap:10px;
  }
  .inkspot-actions a{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height:34px;
    padding:0 15px;
    border-radius:3px;
    text-decoration:none;
    white-space:nowrap;
    font-size:12px;
  }
  .inkspot-login{
    color:#f1e7d2;
    border:1px solid #b98e49;
    background:transparent;
  }
  .inkspot-join{
    color:#17302b;
    background:#c99b4b;
    border:1px solid #c99b4b;
    font-weight:700;
  }
  .inkspot-mobile-menu{display:none;}

  @media (max-width:1180px){
    .inkspot-real-header{gap:14px;padding:0 18px;}
    .inkspot-brand{min-width:190px;}
    .inkspot-brand-copy strong{font-size:18px;}
    .inkspot-nav{gap:13px;}
    .inkspot-nav a{font-size:10px;}
    .inkspot-actions a{padding:0 10px;}
  }

  @media (max-width:900px){
    .inkspot-real-header{height:66px;justify-content:space-between;}
    .inkspot-brand{min-width:0;}
    .inkspot-nav,.inkspot-actions{display:none;}
    .inkspot-mobile-menu{display:block;position:relative;}
    .inkspot-mobile-menu summary{
      list-style:none;
      cursor:pointer;
      border:1px solid #b98e49;
      padding:10px 13px;
      border-radius:3px;
      color:#f1e7d2;
      font-size:12px;
    }
    .inkspot-mobile-menu summary::-webkit-details-marker{display:none;}
    .inkspot-mobile-links{
      position:absolute;
      right:0;
      top:44px;
      width:240px;
      padding:10px 16px 16px;
      background:#07362f;
      border:1px solid rgba(197,154,82,.45);
      box-shadow:0 12px 28px rgba(0,0,0,.34);
    }
    .inkspot-mobile-links a{
      display:block;
      color:#f1e7d2;
      text-decoration:none;
      padding:11px 2px;
      border-bottom:1px solid rgba(197,154,82,.2);
      font:15px/1.2 Georgia,serif;
    }
    .inkspot-mobile-links a:last-child{border-bottom:0;}
  }
</style>
<header class="inkspot-real-header">
  <a class="inkspot-brand" href="/">
    <img src="/brand/inkspot-logo.webp" alt="Ink Spot Roastery">
    <span class="inkspot-brand-copy"><strong>INK SPOT</strong><small>LITERARY COFFEEHOUSE</small></span>
  </a>
  <nav class="inkspot-nav" aria-label="Primary navigation">
    <a href="/read">Read</a>
    <a href="/write">Write</a>
    <a href="/featured-writer">Featured Writer</a>
    <a href="/books">Books on the Table</a>
    <a href="/prompts">Prompts</a>
    <a href="/nook">The Nook</a>
    <a href="/membership">Membership</a>
    <a href="/about">About</a>
  </nav>
  <div class="inkspot-actions">
    <a class="inkspot-login" href="/login">Log in</a>
    <a class="inkspot-join" href="/membership">Join Ink Spot</a>
  </div>
  <details class="inkspot-mobile-menu">
    <summary>Menu</summary>
    <nav class="inkspot-mobile-links" aria-label="Mobile navigation">
      <a href="/read">Read</a>
      <a href="/write">Write</a>
      <a href="/featured-writer">Featured Writer</a>
      <a href="/books">Books on the Table</a>
      <a href="/prompts">Prompts</a>
      <a href="/nook">The Nook</a>
      <a href="/membership">Membership</a>
      <a href="/about">About</a>
      <a href="/login">Log in</a>
    </nav>
  </details>
</header>`;

export async function GET() {
  const source = await readFile(join(process.cwd(), 'approved-spa-live.html'), 'utf8');
  const html = source.replace('<body>', `<body>${header}`);
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
    },
  });
}
