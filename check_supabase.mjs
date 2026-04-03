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

  // 2. Check Storage Bucket 'payment-screenshots'
  console.log('\n--- Checking Storage Bucket "payment-screenshots" ---');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('❌ Error listing buckets:', bucketsError.message);
  } else {
    const bucketExists = buckets.find(b => b.name === 'payment-screenshots');
    if (bucketExists) {
      console.log('✅ "payment-screenshots" bucket exists.');
    } else {
      console.error('❌ "payment-screenshots" bucket does NOT exist.');
      console.log('Available buckets:', buckets.map(b => b.name).join(', '));
    }
  }

  // 3. Ping the edge function 'sync-to-sheets' (might fail if not deployed or no body logic)
  console.log('\n--- Checking Edge Function "sync-to-sheets" ---');
  // We'll just do a dry run or expect a specific error if it's not found
  try {
    const { data: funcData, error: funcError } = await supabase.functions.invoke('sync-to-sheets', {
      body: { ping: true }
    });
    
    if (funcError) {
      console.error('❌ Error invoking "sync-to-sheets" function:', funcError.message || funcError.name);
      if (funcError.context) {
          console.error(await funcError.context.text());
      }
    } else {
      console.log('✅ "sync-to-sheets" function successfully invoked. Response:', funcData);
    }
  } catch (err) {
      console.error('❌ Exception invoking function:', err.message);
  }
}

check();
