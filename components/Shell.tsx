'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ReactNode,useState} from 'react';

const nav=[['Read','/read'],['Write','/write'],['Featured Writer','/featured-writer'],['Books on the Table','/books'],['Prompts','/prompts'],['The Nook','/nook'],['Membership','/membership'],['About','/about']];

export function Shell({children,active}:{children:ReactNode;active?:string}){
 const [open,setOpen]=useState(false);
 return <div className="siteFrame">
  <header className="siteHeader">
   <Link href="/" className="brand" onClick={()=>setOpen(false)}>
    <span className="brandMark"><Image src="/brand/inkspot-logo.webp" alt="" width={42} height={42}/></span>
    <span className="brandWords"><strong>INK SPOT</strong><small>LITERARY COFFEEHOUSE</small></span>
   </Link>
   <button className="mobileMenuButton" aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?'×':'☰'}</button>
   <nav className={`mainNav ${open?'open':''}`}>{nav.map(([n,h])=><Link onClick={()=>setOpen(false)} className={active===h?'active':''} key={h} href={h}>{n}</Link>)}<div className="mobileNavActions"><Link onClick={()=>setOpen(false)} href="/login">Log in</Link><Link onClick={()=>setOpen(false)} className="join" href="/membership">Join Ink Spot</Link></div></nav>
   <div className="headActions"><button aria-label="Search">⌕</button><button aria-label="Notifications">♧</button><Link className="login" href="/login">Log in</Link><Link className="join" href="/membership">Join Ink Spot</Link></div>
  </header>
  <main>{children}</main>
  <footer className="siteFooter">
   <span className="footerSun">✹</span>
   <div><b>Stay in the loop.</b><small>Thoughtful reads, writing prompts, and café news—once a week.</small></div>
   <form className="subscribe"><input aria-label="Email address" placeholder="Your email address"/><button type="button">Subscribe</button></form>
   <div className="follow"><small>Follow along</small><span>◎ ● ♥ ◉</span></div>
  </footer>
 </div>
}
