/* Mirrors src/lib/payments/config.ts PLANS on preview/full-app. Edit there first; keep in sync. No payment integration here. */
window.PRICING={
 studioUrl:'front_preview.html',
 plans:[
  {id:'single_inr',reg:'india',name:'Single Use',hi:'सिंगल यूज़',price:'₹20',per:'one-time',perHi:'एक बार',best:false,
   li:['One clean CV download (PDF/Word) OR one form fill','1 profile'],liHi:['एक साफ़ CV डाउनलोड (PDF/Word) या एक फ़ॉर्म फ़िल','1 प्रोफ़ाइल']},
  {id:'career_starter',reg:'india',name:'Career Starter',hi:'करियर स्टार्टर',price:'₹1,000',per:'per year · ≈ ₹83/month',perHi:'प्रति वर्ष · ≈ ₹83/माह',best:true,
   li:['2 profiles','100 CV generations','100 form fills (up to 100 companies, counted within those fills)','Saves ₹3,000 (75%) vs ₹4,000 paying ₹20 each'],
   liHi:['2 प्रोफ़ाइल','100 CV जनरेशन','100 फ़ॉर्म फ़िल (100 कंपनियों तक, इन्हीं फ़िल में गिनी जाती हैं)','₹20 प्रति उपयोग के ₹4,000 की तुलना में ₹3,000 (75%) की बचत']},
  {id:'global_single',reg:'intl',name:'Global Single Use',hi:'ग्लोबल सिंगल यूज़',price:'$1',per:'one-time',perHi:'एक बार',best:false,
   li:['One clean CV download (PDF/Word) OR one form fill','1 profile'],liHi:['एक साफ़ CV डाउनलोड (PDF/Word) या एक फ़ॉर्म फ़िल','1 प्रोफ़ाइल']},
  {id:'global_pro',reg:'intl',name:'Global Pro',hi:'ग्लोबल प्रो',price:'$29',per:'per year · ≈ $2.42/month',perHi:'प्रति वर्ष · ≈ $2.42/माह',best:true,
   li:['1 profile','300 CV generations','300 form fills','Remaining credits always shown','Saves $271 vs $300 paying $1 per fill'],
   liHi:['1 प्रोफ़ाइल','300 CV जनरेशन','300 फ़ॉर्म फ़िल','बचे हुए क्रेडिट हमेशा दिखते हैं','$1 प्रति फ़िल के $300 की तुलना में $271 की बचत']}
 ]
};
