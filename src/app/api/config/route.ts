import { featureConfig } from "@/config/feature";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    features: {
      appModeDisplay: featureConfig.appModeDisplay,
      auth: featureConfig.authEnabled,
      stripe: featureConfig.stripeEnabled,
      socialAuth: featureConfig.socialAuthEnabled,
      docs: featureConfig.docsEnabled,
      blog: featureConfig.blogEnabled,
      submission: featureConfig.submissionEnabled,
    },
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
    },
  });
} 