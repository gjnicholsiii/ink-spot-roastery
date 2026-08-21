import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/approved-loader.html?p=home');
}
