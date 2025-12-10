import VitalsDashboard from '@/components/VitalsDashboard';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tighter">VitalsSync</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold bg-black text-white px-3 py-1">BETA</span>
          </div>
        </div>
      </header>
      <VitalsDashboard />
    </main>
  );
}
