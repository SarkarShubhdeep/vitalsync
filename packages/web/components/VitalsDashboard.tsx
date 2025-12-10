'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Vital {
  _id?: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
}

export default function VitalsDashboard() {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    unit: ''
  });

  const fetchVitals = async () => {
    try {
      const response = await client.vitals.getApiVitals();
      setVitals(response.data);
    } catch (error) {
      console.error('Failed to fetch vitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.value || !formData.unit) return;

    try {
      await client.vitals.postApiVitals({
        requestBody: {
          type: formData.type,
          value: Number(formData.value),
          unit: formData.unit,
          timestamp: new Date().toISOString()
        }
      });
      setFormData({ type: '', value: '', unit: '' });
      fetchVitals();
    } catch (error) {
      console.error('Failed to add vital:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        {/* Input Section */}
        <section>
          <Card title="Add New Vital" className="sticky top-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input 
                label="Type" 
                placeholder="e.g. Heart Rate"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              />
              <Input 
                label="Value" 
                type="number" 
                placeholder="e.g. 75"
                value={formData.value}
                onChange={e => setFormData({...formData, value: e.target.value})}
              />
              <Input 
                label="Unit" 
                placeholder="e.g. bpm"
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
              />
              <Button type="submit" className="mt-2 text-lg">
                Record Vital
              </Button>
            </form>
          </Card>
        </section>

        {/* List Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight">Recent Entries</h2>
            <Button variant="outline" onClick={fetchVitals} disabled={loading}>
              Refresh
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse border-2 border-gray-200" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {vitals.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-8 text-center text-gray-500">
                  No vitals recorded yet.
                </div>
              ) : (
                vitals.map((vital) => (
                  <Card key={vital._id} className="transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{vital.type}</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">
                          {new Date(vital.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black block">{vital.value}</span>
                        <span className="text-sm font-medium text-gray-600 bg-gray-200 px-2 py-0.5 inline-block">
                          {vital.unit}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
