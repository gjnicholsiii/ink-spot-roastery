import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

async function imageBuffer(){
  const parts:string[]=[];
  for(let i=0;i<9;i++){
    const name=`part${String(i).padStart(2,'0')}.txt`;
    parts.push((await readFile(path.join(process.cwd(),'app','new-hero-data',name),'utf8')).trim());
  }
  return Buffer.from(parts.join(''),'base64');
}

export async function GET(req:Request){
  const image=await imageBuffer();
  const url=new URL(req.url);
  if(url.searchParams.get('meta')==='1'){
    const meta=await sharp(image).metadata();
    return Response.json({bytes:image.length,width:meta.width,height:meta.height,format:meta.format});
  }
  return new Response(new Uint8Array(image),{headers:{'content-type':'image/webp','cache-control':'public, max-age=31536000, immutable'}});
}
