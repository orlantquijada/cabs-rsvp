import { type SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import * as v from "valibot";

export interface SessionData {
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	password: process.env.SECRET!,
	cookieName: "split-session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};
export const loginSchema = v.object({
	password: v.string(),
});
export type LoginData = v.InferOutput<typeof loginSchema>;

export async function getSession() {
	const session = await getIronSession<SessionData>(
		await cookies(),
		sessionOptions,
	);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}

	return session;
}
