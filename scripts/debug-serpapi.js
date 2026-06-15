/**
 * Debug SerpAPI response
 */

const https = require('https');

const SERPAPI_KEY = 'c367d5503be1fc1754434786abb252611119a0c1fc10efaaa9713ac83cd82770';
const TEST_QUERY = 'what is geo';

const params = new URLSearchParams({
  engine: 'google',
  q: TEST_QUERY,
  api_key: SERPAPI_KEY,
  location: 'United States',
  gl: 'us',
  hl: 'en',
  num: 10
});

const url = `https://serpapi.com/search?${params.toString()}`;

console.log('Testing SerpAPI with query:', TEST_QUERY);
console.log('URL:', url.replace(SERPAPI_KEY, 'API_KEY_HIDDEN'));
console.log('\n');

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Response Status:', res.statusCode);
      console.log('\nResponse Keys:', Object.keys(json));
      console.log('\nFull Response:');
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Parse error:', e.message);
      console.log('Raw response:', data);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err.message);
});
