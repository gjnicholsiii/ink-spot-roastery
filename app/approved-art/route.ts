import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

const crops: Record<string, {page:string; left:number; top:number; width:number; height:number}> = {
  homeHero:{page:'home',left:0,top:73,width:1448,height:432},
  maya:{page:'home',left:30,top:505,width:335,height:270},
  homeBlend:{page:'home',left:160,top:810,width:147,height:152},
  homeBooks:{page:'home',left:315,top:842,width:253,height:120},
  homePrompt:{page:'home',left:700,top:785,width:175,height:183},
  homeNook:{page:'home',left:1110,top:850,width:255,height:97},
  shelf1:{page:'home',left:1118,top:545,width:56,height:55},
  shelf2:{page:'home',left:1118,top:606,width:56,height:54},
  shelf3:{page:'home',left:1118,top:667,width:56,height:61},
  featuredHero:{page:'featured',left:0,top:73,width:1448,height:377},
  featuredBlend:{page:'featured',left:180,top:720,width:260,height:240},
  featuredBooks:{page:'featured',left:1110,top:790,width:260,height:137},
  nookHero:{page:'nook',left:0,top:73,width:1448,height:385},
  nook1:{page:'nook',left:28,top:535,width:214,height:223},
  nook2:{page:'nook',left:250,top:535,width:219,height:223},
  nook3:{page:'nook',left:477,top:535,width:222,height:223},
  nook4:{page:'nook',left:707,top:535,width:214,height:223},
  nook5:{page:'nook',left:929,top:535,width:222,height:223},
  nook6:{page:'nook',left:1159,top:535,width:214,height:223},
  nook7:{page:'nook',left:28,top:846,width:214,height:139},
  nook8:{page:'nook',left:250,top:846,width:219,height:139},
  nook9:{page:'nook',left:477,top:846,width:222,height:139},
  nook10:{page:'nook',left:707,top:846,width:214,height:139},
  nook11:{page:'nook',left:929,top:846,width:222,height:139},
  nook12:{page:'nook',left:1159,top:846,width:214,height:139}
};

function extractPage(html:string,key:string){
  const m=html.match(new RegExp(`\\"${key}\\":\\"data:image\\/webp;base64,([^\\"]+)\\"`));
  return m?.[1] || '';
}

export async function GET(req:Request){
  const url=new URL(req.url);
  const key=url.searchParams.get('a') || '';
  const crop=crops[key];
  if(!crop) return new Response('Not found',{status:404});
  const html=await readFile(path.join(process.cwd(),'approved-spa-live.html'),'utf8');
  const b64=extractPage(html,crop.page);
  if(!b64) return new Response('Approved artwork missing',{status:500});
  const source=Buffer.from(b64,'base64');
  const image=await sharp(source).extract({left:crop.left,top:crop.top,width:crop.width,height:crop.height}).webp({quality:94}).toBuffer();
  return new Response(new Uint8Array(image),{headers:{'content-type':'image/webp','cache-control':'public, max-age=31536000, immutable'}});
}
