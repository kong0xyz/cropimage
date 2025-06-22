import { featureConfig } from "@/config/feature";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

export const { GET, POST } = featureConfig.authEnabled
  ? toNextJsHandler(auth.handler)
  : {
      GET: (request: Request) =>
        NextResponse.json(
          { error: "Authentication feature is disabled" },
          { status: 403 }
        ),
      POST: (request: Request) =>
        NextResponse.json(
          { error: "Authentication feature is disabled" },
          { status: 403 }
        ),
    };
