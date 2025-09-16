import { NextResponse } from "next/server";
import {
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/lib/services/portfolio.api.service";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await getPortfolio(params.id);
  if (!item)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await updatePortfolio(params.id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await deletePortfolio(params.id);
  return NextResponse.json({ ok: true });
}
