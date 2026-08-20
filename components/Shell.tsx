import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

const nav = [['Read','/read'],['Write','/write'],['Featured Writer','/featured-writer'],['Books on the Table','/books'],['Prompts','/prompts'],['The Nook','/nook'],['Membership','/membership'],['About','/about']];
export function Shell({children}:{children:ReactNode}){
  return <>
    <header className="siteHeader">
      <Link href="/" className="brand"><Image src="/brand/inkspot-logo.webp" alt="Ink Spot" width={62} height={62}/><span><strong>INK SPOT ROASTERY</strong><small>GREAT STORIES START HERE</small></span></Link>
      <nav>{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}</nav>
      <div className="headActions"><button aria-label="Search">⌕</button><button aria-label="Notifications">♢</button><Link className="login" href="/login">Log in</Link><Link className="join" href="/membership">Join Ink Spot</Link></div>
    </header>
    <main>{children}</main>
    <footer><div><strong>INK SPOT ROASTERY</strong><p>Great stories start here.</p></div><p>A literary coffeehouse on the internet. Read something good. Leave something behind.</p><div><Link href="/coffee">Coffee</Link> · <Link href="/about">About</Link></div></footer>
  </>
}
