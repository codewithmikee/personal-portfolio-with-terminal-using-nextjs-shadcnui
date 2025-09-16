import { NextResponse } from "next/server";
import {
  listPortfolios,
  createPortfolio,
} from "@/lib/services/portfolio.service";

export async function GET() {
  const items = await listPortfolios();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const created = await createPortfolio(body);
  return NextResponse.json(created, { status: 201 });
}
