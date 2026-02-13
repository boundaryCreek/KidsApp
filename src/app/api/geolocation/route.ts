import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  
  // Get geolocation data from Vercel headers
  const country = headersList.get('x-vercel-ip-country') || '';
  const city = headersList.get('x-vercel-ip-city') || '';
  const region = headersList.get('x-vercel-ip-country-region') || '';
  
  // Check if user is in Minnesota
  const isMinnesota = country === 'US' && (region === 'MN' || region === 'Minnesota');
  
  // Determine the location to return
  let location = 'Twin Cities'; // Fallback
  
  if (isMinnesota && city) {
    location = city;
  } else if (!city) {
    location = 'Twin Cities';
  }
  
  return NextResponse.json({
    location,
    city: city || null,
    region,
    country,
    isMinnesota,
  });
}
