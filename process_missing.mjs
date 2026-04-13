import fs from 'fs';

const rawCsv = `id,team_name,leader_name,leader_email,leader_phone,leader_department,leader_college,technical_event,non_technical_event,participant1_name,participant1_department,participant1_college,participant1_email,participant1_phone,participant2_name,participant2_department,participant2_college,participant2_email,participant2_phone,participant3_name,participant3_department,participant3_college,participant3_email,participant3_phone,payment_screenshot_url,created_at
99453cb8-ac1b-40ee-bb2b-9f5882e92bee,Rolex,"V R Blesslin Sino ",blesslinsino.250062@cse.ritchennai.edu.in,9600359927,"CSE ","RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",,Mystery Box Innovation,Blessy B,CSE,"Rajalakshmi Institute of Technology ",blessy.250063@cse.ritchennai.edu.in,9600265200,Gayathiri M,CSE,"Rajalakshmi Institute Of Technology ",gayathiri.250103@cse.ritchennai.edu.in,8870771487,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776070006357_c9qpu.jpg,2026-04-13 14:16:49.800715
31b84836-3524-4d07-8e88-0123fb27fc0b,"NC CREW ",Harish Kumar,sec25ec083@sairamtap.edu.in,8825700821,ECE,"Sri Sairam Engineering College ",,Reel Making Challenge,"Gowtham ",ECE,"Sri Sairam Engineering College ",sec25ec223@sairamtap.edu.in,9710076752,"Ajay ",ECE,"Sri Sairam Engineering College ",sec25ec202@sairamtap.edu.in,8939132054,"Sanjay Kumar ",ECE,"Sri Sairam Engineering College ",sec25ec247@sairamtap.edu.in,9884601239,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776072369105_vjq2wf.jpg,2026-04-13 14:56:20.838749
cbddbcef-1564-43c0-ade5-7c3294da6288,Excel Empirics,M.KIRUBHAKARAN,kiranofficial0210@gmail.com,9344878227,"CSE ","Excel Engineering College ",Research Pitch,,J.Kishore,"CSE ","Excel Engineering College ",Kishorejerry64@gmail.com,8248016295,K.NARAYANAKUMAR,"CSE ","Excel Engineering College ",narayanak308@gmail.com,+919345589932,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776072758142_n0zi9.jpg,2026-04-13 15:02:42.187502
53fc3e78-d3c0-486f-9725-fe90cf1fbfaf,Sparkling Duo,"Aadhithyan S ",aadhithyan17052008@gmail.com,8939004130,CSE,"Rajalakshmi institute of technology ",UI/UX Redesign Challenge,,Abinaya KS,CSE,"Rajalakshmi institute of technology ",abinayaks318@gmail.com,8122021083,,,,,,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776078051547_99n03r.png,2026-04-13 16:30:55.498465
76fa8f89-4238-40b9-be9c-9660c7a7065c,Monsoon Springs,"Akshita Kannappan ",akshitakannappan.250022@cse.ritchennai.edu.in,7550339346,CSE,"Rajalakshmi Institute of Technology ",,Mystery Box Innovation,Abarna L," CSE","Rajalakshmi institute of technology ",abarna.250003@cse.ritchennai.edu.in,9342742034,Akshaya G,CSE,"Rajalakshmi Institute of Technology ",akshaya.250018@ritchennai.edu.in,8838573957,Harini T.S,AIDS,"Rajalakshmi Institute of Technology ",harinit.250107@aids.ritchennai.edu.in,9442021450,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776078639852_m3678j.jpg,2026-04-13 16:40:43.06634
b4ef420d-94fb-4d0f-aee6-eb47afaa3945,REELS SQUAD,"SAFRIN MOHAMED RAFFIK ",safrinraffik.240325@cse.ritchennai.edu.in,9952958406,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",,Reel Making Challenge,FARREN JEANVIL.F,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",farren.240102@cse.ritchennai.edu.in,9791545583,ABINA JERLIN.M,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",abina.240006@cse.ritchennai.edu.in,8015183954,KESHAV.K,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",keshav.240196@cse.ritchennai.edu.in,9047130106,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776081635152_ocpx0c.jpg,2026-04-13 17:30:37.95009
e6add746-2c78-47a6-a229-80003eb416f0,Obsidian Force,"KESAV PRASAD MAHADEVAN ",kesavprasad.250203@cse.richennai.edu.in,6379295675,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",,Mystery Box Innovation,"KAVINRAJA A R ",CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",kavinraja.250194@cse.ritchennai.edu.in,8300780646,KRISHNA R,CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",krishna.250221@cse.ritchennai.edu.in,7871180284,"KISHORE L ",CSE,"RAJALAKSHMI INSTITUTE OF TECHNOLOGY ",kishore.250194@cse.ritchennai.edu.in,8870525388,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776084465402_tdtsjc.jpg,2026-04-13 18:17:50.587671
c30cae68-cf08-4d5e-be70-b96c3b62211c,NeuroNova,B Santhosh Kumar,santhosh2007.axl@gmail.com,8056253897,BE CSE,Simats Engineering,Build a Startup in 60 Min,,Barathvaaj S,B.E.Biomedical Engineering,Simats Engineering,barathvaaj2006@gmail.com,9384603994,,,,,,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776089417373_55i8ka.jpg,2026-04-13 19:40:19.379389
20e0044c-9e17-4e27-9d4d-effdd029060d,"Prompt Architects ",VENKATESH. P,venk9708@gmail.com,8778486470,AI&DS,"SAVEETHA ENGINEERING COLLEGE ",AI Prompt Engineering Battle,,Siva Kumar. R,AI&ML,"PANIMALAR ENGINEERING COLLEGE ",sivakumar211107@gmail.com,9345980956,Surendra Kanna. S,AI&ML,"PANIMALAR ENGINEERING COLLEGE ",surendrakanna19082007@gmail.com,9345523695,Pradeep. K,"Mechanical ","Saveetha engineering college ",kumaravelpradeep06@gmail.com,9994399253,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776090257736_j629au.jpg,2026-04-13 19:54:20.794929
be67197b-ea0d-4c2c-b901-d9df0e27123e,"Silent tempest ",Gunashree R,gunashree03102006@gmail.com,7092658584,AIDS,"Rajalakshmi institute of technology ",Tech Treasure Hunt,,Janani M,AIDS,"Rajalakshmi institute of technology ",Janani.240123@aids.ritchennai.edu.in,9003201563,,,,,,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776090730136_fhrmei.png,2026-04-13 20:02:12.176151
6c210a42-1e1d-4db6-bd5e-935bdfb94168,Sodhapasanga,Logeshwaran S.T,lokeshsathishkumar448@gmail.com,7338886634,CSE,"Rajalakshmi institute of technology ",,E-Sports: FREE FIRE,"Mohankumar M ",CSE,"Rajalakshmi institute of technology ",mohankumar28072006m@gmail.com,9047812085,,,,,,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776092009005_v5vutv.jpg,2026-04-13 20:23:38.564666
320ba6a9-a6a0-481f-856d-4a44c2489408,"Team Power eSports ","Lohith Akash ",lohithakash.250233@cse.ritchennai.edu.in,7358058400,CSE,"Rajalakshmi institute of technology ",,E-Sports: FREE FIRE,Nithish U,CSE,"Rajalakshmi institute of technology ",nithish.250284@cse.ritchennai.edu.in,6382997006,,,,,,,,,,,https://ttifqicjgtugqeyfgbqp.supabase.co/storage/v1/object/public/screenshots/1776093815853_bvym7b.jpg,2026-04-13 20:53:37.902553`;

// Basic CSV parser to handle quotes
function parseCsv(text) {
  const result = [];
  let row = [];
  let col = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"' && text[i+1] === '"') {
      col += '"'; i++;
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      row.push(col); col = '';
    } else if (c === '\\n' && !inQuotes) {
      row.push(col); result.push(row); row = []; col = '';
    } else if (c === '\\r' && !inQuotes) {
      // skip
    } else {
      col += c;
    }
  }
  if (col || row.length) {
    row.push(col);
    result.push(row);
  }
  return result;
}

const data = parseCsv(rawCsv);
const headers = data[0];

const formatChennaiTimestamp = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const valueByType = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  )

  return `${valueByType.year}-${valueByType.month}-${valueByType.day} ${valueByType.hour}:${valueByType.minute}:${valueByType.second} IST`
}

const normalizePhone = (value = '') => {
  const digits = String(value).replace(/\\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  return "'" + digits; // Add quote so Sheets treats it as text
}

// Target columns structure matching your API
const outputRows = [['Timestamp', 'Team Name', 'Leader Name', 'Leader Email', 'Leader Phone', 'Leader Dept', 'Leader College', 'M2 Name', 'M2 Email', 'M2 Phone', 'M2 Dept', 'M2 College', 'M3 Name', 'M3 Email', 'M3 Phone', 'M3 Dept', 'M3 College', 'M4 Name', 'M4 Email', 'M4 Phone', 'M4 Dept', 'M4 College', 'Event Name', 'Payment Proof']];

for (let i = 1; i < data.length; i++) {
  const r = Object.fromEntries(headers.map((h, idx) => [h, data[i][idx] || '']));
  
  if (!r.id) continue;
  
  const eventName = r.technical_event || r.non_technical_event || '';
  
  const row = [
    formatChennaiTimestamp(r.created_at),
    r.team_name,
    r.leader_name, r.leader_email, normalizePhone(r.leader_phone), r.leader_department, r.leader_college,
    r.participant1_name, r.participant1_email, normalizePhone(r.participant1_phone), r.participant1_department, r.participant1_college,
    r.participant2_name, r.participant2_email, normalizePhone(r.participant2_phone), r.participant2_department, r.participant2_college,
    r.participant3_name, r.participant3_email, normalizePhone(r.participant3_phone), r.participant3_department, r.participant3_college,
    eventName,
    r.payment_screenshot_url
  ];
  
  outputRows.push(row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','));
}

fs.writeFileSync('missing_for_sheets.csv', outputRows.join('\\n'));
console.log('Done!');
