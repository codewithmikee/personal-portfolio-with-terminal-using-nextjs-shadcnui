import { NextResponse } from "next/server";
import {
  listPortfolios,
  createPortfolio,
  getPortfolioByExternalId,
} from "@/lib/services/portfolio.api.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const externalId = searchParams.get("externalId");

  if (externalId) {
    // Get specific portfolio by external ID
    const portfolio = await getPortfolioByExternalId(externalId);
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(portfolio);
  }

  // Get all portfolios
  const items = await listPortfolios();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.externalId || !body.profile?.full_name || !body.profile?.email) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: externalId, profile.full_name, profile.email",
        },
        { status: 400 }
      );
    }

    // Check if external ID already exists
    const existing = await getPortfolioByExternalId(body.externalId);
    if (existing) {
      return NextResponse.json(
        { error: "Portfolio with this external ID already exists" },
        { status: 409 }
      );
    }

    const created = await createPortfolio(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
