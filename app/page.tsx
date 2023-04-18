import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/about'}>Navigate to home page</Link>
      <h1>Hello Next 13</h1>
    </main>
  );
}
