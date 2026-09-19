import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">MM Amandamart</h1>
        <p className="text-slate-600 text-sm mb-6">StoreOps Auto-Collage System</p>
        
        <Link 
          href="/preview" 
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-all"
        >
          Buka Preview Laporan 🚀
        </Link>
      </div>
    </main>
  );
}
