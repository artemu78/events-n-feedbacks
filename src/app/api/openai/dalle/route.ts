import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

import { authorize, isDecodedClaims } from '@/app/api/authorize';

export async function POST(request: NextRequest, response: NextResponse) {
  const decodedClaims = await authorize();
  if (!isDecodedClaims(decodedClaims)) return decodedClaims;

  const body = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_TOKEN,
  });

  let image;
  try {
    image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `please draw a picture on this topic: ${body.prompt}`,
      size: '1024x1024',
      style: 'vivid',
      response_format: 'url',
    });
  } catch (err: any) {
    console.log('err?.error', err?.error);
    return NextResponse.json(err?.error, { status: err?.status });
  }
  return NextResponse.json(image?.data[0], { status: 200 });
}
