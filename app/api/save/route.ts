import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Helper function to save a base64 image
async function saveImage(key: string, base64Data: string) {
  // Extract the base64 part
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid input string');
  }

  const mimeType = matches[1];
  const extension = mimeType.split('/')[1] === 'jpeg' ? 'jpg' : mimeType.split('/')[1];
  const imageBuffer = Buffer.from(matches[2], 'base64');
  
  // Create a clean filename from the key (e.g., "i:hero-bg" -> "hero-bg.jpg")
  const cleanKey = key.replace('i:', '').replace(/[^a-zA-Z0-9-_]/g, '-');
  const fileName = `${cleanKey}.${extension}`;
  
  // Save to public/uploads directory
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadsDir, fileName);

  try {
    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(filePath, imageBuffer);
    
    // Return the public URL path
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error(`Failed to save image ${fileName}:`, error);
    throw error;
  }
}

export async function POST(req: Request) {
  // Only allow in development mode or if explicitly enabled
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Saving is only allowed in development mode' }, { status: 403 });
  }

  try {
    const { texts, images } = await req.json();

    // 1. Save Texts
    const dataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    // We'll read the existing texts to merge them, so we don't lose anything not sent in this request
    const textsPath = path.join(dataDir, 'content.json');
    let existingTexts = {};
    try {
      const fileContent = await fs.readFile(textsPath, 'utf8');
      existingTexts = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist yet, that's fine
    }

    const mergedTexts = { ...existingTexts, ...texts };
    await fs.writeFile(textsPath, JSON.stringify(mergedTexts, null, 2), 'utf8');

    // 2. Save Images
    const savedImagesMap: Record<string, string> = {};
    
    // We also want to keep track of image mappings in a json file so components know which image to load
    const imagesMetaPath = path.join(dataDir, 'images.json');
    let existingImagesMeta = {};
    try {
      const metaContent = await fs.readFile(imagesMetaPath, 'utf8');
      existingImagesMeta = JSON.parse(metaContent);
    } catch (e) {
      // File doesn't exist yet, that's fine
    }

    if (images && typeof images === 'object') {
      for (const [key, value] of Object.entries(images)) {
        if (typeof value === 'string' && value.startsWith('data:image')) {
          try {
             const publicPath = await saveImage(key, value);
             savedImagesMap[key] = publicPath;
          } catch (imgError) {
             console.error(`Error processing image ${key}:`, imgError);
          }
        }
      }
    }

    const mergedImagesMeta = { ...existingImagesMeta, ...savedImagesMap };
    await fs.writeFile(imagesMetaPath, JSON.stringify(mergedImagesMeta, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully!',
      textsSaved: Object.keys(texts || {}).length,
      imagesSaved: Object.keys(savedImagesMap).length,
      imagesMap: savedImagesMap
    });

  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content', details: error.message },
      { status: 500 }
    );
  }
}
