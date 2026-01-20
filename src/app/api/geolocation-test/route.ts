import { geolocation } from '@vercel/functions';
 
export function GET(request: Request) {
  const { city, country, region } = geolocation(request);
  
  return new Response(
    `<html>
      <head>
        <title>Geolocation Test</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 1rem;
            line-height: 1.6;
          }
          .location-info {
            background: #f5f5f5;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #0070f3;
          }
          h1 {
            color: #333;
            margin-bottom: 1rem;
          }
          .detail {
            margin: 0.5rem 0;
            font-size: 1.1rem;
          }
          .note {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #fff3cd;
            border-radius: 6px;
            font-size: 0.9rem;
            color: #856404;
          }
        </style>
      </head>
      <body>
        <h1>🌍 Geolocation Test Results</h1>
        <div class="location-info">
          <div class="detail"><strong>City:</strong> ${city || 'Unknown'}</div>
          <div class="detail"><strong>Region:</strong> ${region || 'Unknown'}</div>
          <div class="detail"><strong>Country:</strong> ${country || 'Unknown'}</div>
        </div>
        <div class="note">
          <strong>Note:</strong> This geolocation data is provided by Vercel's edge network and may vary based on your IP address and network configuration. In development, location data might not be accurate.
        </div>
      </body>
    </html>`,
    {
      headers: { 'content-type': 'text/html' },
    }
  );
}