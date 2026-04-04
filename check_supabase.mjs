import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttifqicjgtugqeyfgbqp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aWZxaWNqZ3R1Z3FleWZnYnFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE1MTUzMSwiZXhwIjoyMDkwNzI3NTMxfQ.7xiO21T6SX9Q0SrO-EsyBjGRzsoF8WMbIjVMNYfoivg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking Supabase connection...');

  // 1. Check Table 'registrations'
  console.log('\n--- Checking Table "registrations" ---');
  const { data: tableData, error: tableError } = await supabase
    .from('registrations')
    .select('*')
    .limit(1);
    
  if (tableError) {
    console.error('❌ Error accessing "registrations" table:', tableError.message);
  } else {
    console.log('✅ "registrations" table is accessible.');
  }

  // 2. Check Storage Bucket 'screenshots'
  console.log('\n--- Checking Storage Bucket "screenshots" ---');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('❌ Error listing buckets:', bucketsError.message);
  } else {
    const bucketExists = buckets.find(b => b.name === 'screenshots');
    if (bucketExists) {
      console.log('✅ "screenshots" bucket exists.');
    } else {
      console.error('❌ "screenshots" bucket does NOT exist.');
      console.log('Available buckets:', buckets.map(b => b.name).join(', '));
    }
  }

  // 3. The Google Sheets sync is a local TanStack route at /api/sync-to-sheets,
  // so this script only verifies Supabase table + storage wiring.
  console.log('\n--- Local backend note ---');
  console.log('ℹ /api/sync-to-sheets is handled by the app server, not a Supabase Edge Function.');
}

check();
