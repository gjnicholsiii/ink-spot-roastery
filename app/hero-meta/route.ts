import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

export async function GET(){
  const source = await readFile(path.join(process.cwd(),'app','approved-art','route.ts'),'utf8');
  const match = source.match(/const HOME_HERO_PATCH = '([^']+)'/);
  if(!match) return Response.json({ok:false,error:'missing'});
  const image = Buffer.from(match[1],'base64');
  const meta = await sharp(image).metadata();
  return Response.json({ok:true,bytes:image.length,width:meta.width,height:meta.height,format:meta.format});
}
