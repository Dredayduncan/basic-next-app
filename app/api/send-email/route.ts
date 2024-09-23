// import { Resend } from "resend";
// import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try{

	// 	const name = 'Dre';

	// await resend.emails.send({
	// 	from: "example@gmail.com",
	// 	to: "example@gmail.com",
	// 	subject: "...",
	// 	react: WelcomeTemplate({ name })
	// });

	return NextResponse.json({message: 'Email sent'});

	}
	catch (error) {
		return NextResponse.json({detail: error}, {status: 500});
	}
	
}
