import { NextRequest } from "next/server";
// import middleware from 'next-auth/middleware'

// export default middleware;

export { default } from 'next-auth/middleware';

export const config = {
	// matcher: "/users",
	matcher: ['/users/:id*']
	// *: zero or more
	// +: one or more
	// ?: zero or one
}