import './globals.css';
import './mobile.css';
import './approved-assets.css';
import './hero-cache-fix.css';
import type { Metadata } from 'next';
import { Shell } from '@/components/Shell';
export const metadata: Metadata = { title: 'Ink Spot Roastery', description: 'A digital literary coffeehouse for readers and writers.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
