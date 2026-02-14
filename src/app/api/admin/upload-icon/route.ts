import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.includes('svg') && !file.name.endsWith('.svg')) {
      return NextResponse.json(
        { error: 'Only SVG files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 500KB)
    if (file.size > 500000) {
      return NextResponse.json(
        { error: 'File size must be less than 500KB' },
        { status: 400 }
      );
    }

    // Read file content
    const buffer = await file.arrayBuffer();
    const content = Buffer.from(buffer).toString('utf-8');

    // Basic SVG validation
    if (!content.includes('<svg')) {
      return NextResponse.json(
        { error: 'Invalid SVG file' },
        { status: 400 }
      );
    }

    // Create filename with timestamp to ensure uniqueness
    const timestamp = Date.now();
    const filename = `icon-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filepath = path.join(process.cwd(), 'public', 'icons', filename);

    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filepath, content);

    // Return the public path
    const publicPath = `/icons/${filename}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename: filename,
    });
  } catch (error) {
    console.error('Error uploading icon:', error);
    return NextResponse.json(
      { error: 'Failed to upload icon' },
      { status: 500 }
    );
  }
}
