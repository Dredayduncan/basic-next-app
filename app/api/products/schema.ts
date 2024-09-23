import { z } from 'zod'

const ProductSchema = z.object({
	name: z.string().min(3),
	price: z.number().max(100),
});

export default ProductSchema;