import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

interface Props {
	params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!product)
		return NextResponse.json(
			{ detail: "Product does not exist" },
			{ status: 404 }
		);

	return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
	const body = await request.json();

	const validation = schema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{ detail: validation.error.errors },
			{ status: 400 }
		);
	}

	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!product)
		return NextResponse.json(
			{ detail: "Product does not exist" },
			{ status: 404 }
		);

	const updatedProduct = await prisma.product.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name: body.name,
			price: parseFloat(body.price),
		},
	});

	return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!product)
		return NextResponse.json(
			{ detail: "Product does not exist" },
			{ status: 404 }
		);

	await prisma.product.delete({
		where: {
			id: parseInt(id),
		},
	});

	return NextResponse.json({});
}
