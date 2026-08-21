import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

const HOME_HERO_PATCH = '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';

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
  let pipeline=sharp(source).extract({left:crop.left,top:crop.top,width:crop.width,height:crop.height});
  if(key==='homeHero'){
    pipeline=pipeline.composite([{input:Buffer.from(HOME_HERO_PATCH,'base64'),left:200,top:40}]);
  }
  const image=await pipeline.webp({quality:94}).toBuffer();
  return new Response(new Uint8Array(image),{headers:{'content-type':'image/webp','cache-control':'public, max-age=0, must-revalidate'}});
}
