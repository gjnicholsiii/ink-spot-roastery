import Link from 'next/link';

export default function Home(){return <>
<section className="homeHero">
 <div className="heroOverlay"></div>
 <div className="homeHeroCopy"><h1>A neighborhood<br/>for readers<br/><em>and writers.</em></h1><p>Good coffee. Great books. Original voices.<br/>Pull up a chair.</p><div><Link className="goldBtn" href="/membership">Join the Table</Link><Link className="textLink" href="/featured-writer">Explore the Café →</Link></div></div>
 <div className="menuBoard"><span>COFFEE</span><p>Drip&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.75<br/>Pour Over&nbsp;&nbsp;&nbsp;4.25<br/>Espresso&nbsp;&nbsp;&nbsp;&nbsp;3.25<br/>Cappuccino&nbsp;3.75<br/>Latte&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.25</p></div>
 <div className="communityBoard"><b>COMMUNITY BULLETIN</b><span>OPEN MIC<br/>7–9PM</span><span>POETRY WALK</span><small>Submissions Open</small></div>
 <div className="nextReading">Next Reading<br/><b>MAYA ROWE</b><br/>May 29 · 7PM</div>
</section>

<section className="homeFeature">
 <div className="mayaPhoto"></div>
 <article className="writerFeature"><small>FEATURED WRITER</small><h2>Maya Rowe</h2><p>Poet. Essayist. Observer of small miracles.</p><blockquote>“I write to make sense of the quiet<br/>things that insist on being seen.”</blockquote><div className="featureMeta"><div><b>FEATURED PIECE</b><em>The Map We Carry</em><span>An essay about inherited stories, found places, and the way home.</span><Link href="/featured-writer">Read Now →</Link></div><div><b>UPCOMING READING</b><em>May 29 · 7PM</em><span>In our café + livestream</span><Link href="/featured-writer">Reserve Your Seat →</Link></div></div></article>
 <article className="blendFeature"><small>MAYA'S HOUSE BLEND</small><h3>Quiet<br/>Cartographer</h3><p>Notes of toasted hazelnut,<br/>dark cocoa, and soft light.</p><Link href="/coffee">Meet the Blend →</Link><div className="bagArt"><b>INK<br/>SPOT</b><small>Quiet<br/>Cartographer</small></div><div className="cupArt"></div></article>
 <article className="shelfFeature"><small>SHELF PICKS</small>{[['The Weathered Thread','A Novel by Lila Maren'],['Light Between Rooms','Poems by J. D. Ellis'],["The Cartographer’s Daughter",'A Novel by Aria Kim']].map(([t,s],i)=><div className="shelfRow" key={t}><i className={'miniCover c'+i}></i><span><b>{t}</b><small>{s}</small></span></div>)}<Link href="/books">See All Picks →</Link></article>
</section>

<section className="homeTiles">
 <Link href="/coffee" className="tile blendTile"><small>FEATURED BLEND</small><h3>Quiet Cartographer</h3><p>Monthly guest blend inspired by Maya Rowe.</p><span>Meet the Blend →</span><div className="roundCoffee"></div></Link>
 <Link href="/books" className="tile booksTile"><small>BOOKS ON THE TABLE</small><h3>Stories worth slowing down for.</h3><div className="bookFan"><i></i><i></i><i></i></div><span>Browse the Table →</span></Link>
 <Link href="/prompts" className="tile promptTile"><small>PROMPT OF THE WEEK</small><h3>Write about a door that<br/>changed what was possible.</h3><div className="notebook"></div><span>Write Now →</span></Link>
 <Link href="/membership" className="tile membershipTile"><small>MEMBERSHIP</small><h3>More connection. More stories.</h3><p>● Members-only content<br/>● Early access to events<br/>● 10% off coffee + books</p><b>Become a Member</b><span>$5 / mo or $50 / yr</span></Link>
 <Link href="/nook" className="tile nookTile"><small>THE NOOK</small><h3>A community of writers.<br/>Real places. Real windows.</h3><div className="nookThumbs"><i></i><i></i><i></i></div><span>Explore the Nook →</span></Link>
</section>
</>}
