const API_URL = 'http://localhost:4000/api/vitals';

const sampleData = [
  { type: 'Heart Rate', value: 72, unit: 'bpm', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() }, // 5 mins ago
  { type: 'Systolic BP', value: 120, unit: 'mmHg', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
  { type: 'Diastolic BP', value: 80, unit: 'mmHg', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
  { type: 'SpO2', value: 98, unit: '%', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() }, // 30 mins ago
  { type: 'Temperature', value: 36.6, unit: '°C', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() }, // 1 hour ago
  { type: 'Weight', value: 75.5, unit: 'kg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
  { type: 'Glucose', value: 95, unit: 'mg/dL', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }, // 2 hours ago
  { type: 'Steps', value: 8500, unit: 'count', timestamp: new Date().toISOString() },
];

async function seed() {
  console.log(`🌱 Seeding data to ${API_URL}...`);
  
  for (const vital of sampleData) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vital)
      });
      
      if (res.ok) {
        console.log(`✅ Added ${vital.type}: ${vital.value} ${vital.unit}`);
      } else {
        console.error(`❌ Failed to add ${vital.type}: ${res.statusText}`);
        const text = await res.text();
        console.error(text);
      }
    } catch (err) {
      console.error(`❌ Error adding ${vital.type}:`, err);
    }
  }
  
  console.log('✨ Seeding complete!');
}

seed();
