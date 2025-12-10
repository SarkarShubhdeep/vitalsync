import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">VitalsSync</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link href="/dashboard" className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
