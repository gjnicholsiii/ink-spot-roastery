import { notFound, redirect } from 'next/navigation';

const routes: Record<string, string> = {
  'read': '/approved-loader.html?p=home',
  'write': '/approved-loader.html?p=home&jump=prompts',
  'featured-writer': '/approved-loader.html?p=featured',
  'books': '/approved-loader.html?p=books',
  'prompts': '/approved-loader.html?p=home&jump=prompts',
  'nook': '/approved-loader.html?p=nook',
  'membership': '/approved-loader.html?p=home&jump=member',
  'about': '/approved-loader.html?p=home',
  'coffee': '/approved-loader.html?p=coffee',
  'login': '/approved-loader.html?p=home'
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const target = routes[slug];
  if (!target) notFound();
  redirect(target);
}
