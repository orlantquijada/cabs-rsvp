import type { Metadata } from "next";
import { Domine, Inconsolata, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const domine = Domine({
	variable: "--font-domine",
	subsets: ["latin"],
});

const inconsolata = Inconsolata({
	variable: "--font-inconsolata",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	// TODO:
	title: "Wedding",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${domine.variable} ${inconsolata.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
