import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
	const products = await prisma.product.findMany();

	return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = await schema.safeParse(body);

	if (!validation.success)
		return NextResponse.json(
			{ detail: validation.error.errors },
			{ status: 400 }
		);

	const product = await prisma.product.create({
		data: {
			name: body.name,
			price: parseFloat(body.price),
		},
	});

	return NextResponse.json(product, { status: 201 });
}
