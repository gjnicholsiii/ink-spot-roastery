import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET(){
  const source = await readFile(path.join(process.cwd(),'app','approved-art','route.ts'),'utf8');
  const match = source.match(/const HOME_HERO_PATCH = '([^']+)'/);
  if(!match) return new Response('Clean hero missing',{status:500});
  const image = Buffer.from(match[1],'base64');
  return new Response(new Uint8Array(image),{
    headers:{
      'content-type':'image/webp',
      'cache-control':'public, max-age=31536000, immutable'
    }
  });
}
