import { ChevronDown } from "lucide-react";
import Image from "next/image";

import type { GetInviationFromCodeValues } from "~/utils/api";

import arc from "../assets/images/arc view.png";
import hero from "../assets/images/hero.png";
import heroText from "../assets/images/hero text.png";
import locationView from "../assets/images/location view.png";
import names from "../assets/images/names.png";

import Flower429 from "../assets/images/flowers/SWIEJKO_flowers_42_9.png";
import Flower4216 from "../assets/images/flowers/SWIEJKO_flowers_42_16.png";
import Flower4223 from "../assets/images/flowers/SWIEJKO_flowers_42_23.png";
import Flower4230 from "../assets/images/flowers/SWIEJKO_flowers_42_30.png";
import Flower4233 from "../assets/images/flowers/SWIEJKO_flowers_42_33.png";
import flowerAside from "../assets/images/flowers/flower aside.png";

import women1 from "../assets/images/womens/womens-1.png";
import women2 from "../assets/images/womens/womens-2.png";
import women3 from "../assets/images/womens/womens-3.png";
import women4 from "../assets/images/womens/womens-4.png";

import men1 from "../assets/images/mens/mens-1.png";
import men2 from "../assets/images/mens/mens-2.png";
import men3 from "../assets/images/mens/mens-3.png";
import men4 from "../assets/images/mens/mens-4.png";

type Props = {
	guest: GetInviationFromCodeValues;
};

export default function HasRSVP({ guest }: Props) {
	if (guest?.rsvp)
		return (
			<div>
				<div className="h-screen w-full flex items-center justify-center flex-col px-6 gap-8">
					<Image src={hero} alt="hero" />
					<Image src={heroText} alt="hero text" />

					<hr className="w-full max-w-52 bg-brand text-brand border-brand" />

					<div className="text-brand grid place-items-center">
						<p className="text-2xl text-center text-pretty">
							Thank you for your RSVP!
						</p>
						<p className="text-xl text-center text-pretty">
							We are so excited you can join us.
						</p>
					</div>

					<div className="text-brand grid place-items-center">
						<p className="mb-2">Be noted of the following</p>
						<a href="#location">
							<ChevronDown size={20} />
						</a>
					</div>
				</div>

				<Location />
				<Colors />
				<Women />
				<Men />
				<Gifts />

				<div className="m-4 md:m-8 grid place-items-center">
					<Image src={arc} alt="hero" />
				</div>
			</div>
		);

	return (
		<div>
			<div className="h-screen w-full flex items-center justify-center flex-col px-6 gap-8">
				<Image src={hero} alt="hero" />
				<Image src={heroText} alt="hero text" />

				<hr className="w-full max-w-52 bg-brand text-brand border-brand" />

				<div className="text-brand grid place-items-center">
					<p className="text-2xl">Sorry you can&apos;t make it</p>
					<p className="text-xl">We will miss you!</p>
				</div>
			</div>

			<div className="m-4 md:m-8 grid place-items-center">
				<Image src={arc} alt="hero" />
			</div>
		</div>
	);
}

function Location() {
	return (
		<div
			id="location"
			className="m-4 flex flex-col md:flex-row relative p-6 gap-16 text-brand-body"
		>
			<div className="flex flex-1">
				<Image
					src={locationView}
					alt="pedro calungsod"
					className="self-end ml-auto"
				/>
			</div>

			<div className="flex flex-col gap-12 font-header flex-1">
				<div className="flex flex-col after:w-8 after:aspect-square after:border-2 after:border-brand relative after:absolute ml-8 after:-left-12 after:-top-2 after:rounded-full before:h-full before:w-0.5 before:bg-brand before:absolute before:top-6 before:bottom-0 before:-left-8">
					<p className="font-bold mb-2">Wedding Ceremony</p>
					<p>Tuesday, June 17th | 1:30PM</p>
					<p className="text-brand">Chapel of Pedro Calungsod</p>

					<p className="text-pretty mt-6">
						SM Seaside Complex, Church Ave., Cebu City
					</p>
				</div>

				<div className="flex flex-col after:w-8 after:aspect-square after:border-2 after:border-brand relative after:absolute ml-8 after:-left-12 after:-top-0 after:rounded-full before:h-8 before:w-0.5 before:bg-brand before:absolute before:-top-8 before:-left-8">
					<p className="font-bold mb-2">Reception</p>
					<p>5:00 PM</p>
					<p className="text-brand">Santa Maria Ballroom, Radisson Blu Hotel</p>
					<p className="text-pretty mt-6">
						Serging Osmena Boulevard, Corner Pope John Paul II Ave, Cebu City,
						6000 Cebu
					</p>
				</div>
			</div>
		</div>
	);
}

function Colors() {
	return (
		<div className="m-4 md:m-8 grid place-items-center relative bg-brand-bg p-6 md:py-16 gap-8 text-brand-body">
			<Image
				src={Flower4230}
				alt="flower"
				height={150}
				className="md:absolute md:right-0 md:top-0"
			/>
			<p className="uppercase font-header font-bold tracking-wide text-lg text-center">
				Wedding Colors
			</p>
			<p className="font-header text-lg text-center font-light text-brand-body/75">
				Please wear a color from the palette.
			</p>
			<p className="font-header text-base text-pretty text-center font-light text-brand-body/75">
				We kindly ask guests to wear shades of <strong>Emerald</strong>,{" "}
				<strong>Blush</strong>, and <strong>Champagne</strong> to complement our
				theme.
			</p>

			<div className="flex flex-wrap items-center justify-center gap-8 flex-col md:flex-row mt-8 md:mt-12">
				<div className="h-20 aspect-square bg-brand-green rounded-full" />
				<div className="h-20 aspect-square bg-brand-mauve rounded-full" />
				<div className="h-20 aspect-square bg-brand-pink rounded-full" />
				<div className="h-20 aspect-square bg-brand-nude rounded-full" />
			</div>

			<Image
				src={Flower429}
				alt="flower"
				height={150}
				className="md:absolute md:left-0 md:bottom-0"
			/>
		</div>
	);
}

function Women() {
	return (
		<div className="m-4 md:m-8 grid place-items-center relative bg-brand-bg p-6 md:py-16 gap-8 text-brand-body">
			<Image
				src={Flower4223}
				alt="flower"
				height={150}
				className="md:absolute md:right-0 md:top-0"
			/>

			<p className="uppercase font-header tracking-wide text-2xl text-center max-w-sm">
				Women&apos;s Dressy casual outfit inspiration
			</p>

			<div className="flex flex-wrap items-center justify-center gap-8 flex-col md:flex-row mt-8 md:mt-12">
				{[women1, women2, women3, women4].map((src, idx) => (
					<div
						className="h-50 aspect-square border-2 border-brand-body/75"
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={idx}
					>
						<Image src={src} alt="women outfit" />
					</div>
				))}
			</div>

			<p className="text-center text-pretty font-header font-light text-brand-body/75">
				A cocktail dress, elegant blouse with skirt/pants, or a stylish jumpsuit
				are great choices.
			</p>
		</div>
	);
}

function Men() {
	return (
		<div className="m-4 md:m-8 grid place-items-center relative bg-brand-bg p-6 md:py-16 gap-8 text-brand-body">
			<Image
				src={Flower4233}
				alt="flower"
				height={150}
				className="md:absolute md:right-0 md:top-0"
			/>

			<p className="uppercase font-header tracking-wide text-2xl text-center max-w-sm">
				Men&apos;s Dressy casual outfit inspiration
			</p>

			<div className="flex flex-wrap items-center justify-center gap-8 flex-col md:flex-row mt-8 md:mt-12">
				{[men1, men2, men3, men4].map((src, idx) => (
					<div
						className="h-50 aspect-square border-2 border-brand-body/75"
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={idx}
					>
						<Image src={src} alt="men outfit" />
					</div>
				))}
			</div>

			<p className="text-center text-pretty font-header font-light text-brand-body/75">
				A dress shirt / polog with slacks is perfect
			</p>

			<Image
				src={Flower429}
				alt="flower"
				height={150}
				className="md:absolute md:left-0 md:bottom-0"
			/>
		</div>
	);
}

function Gifts() {
	return (
		<div className="m-4 md:m-8 grid place-items-center relative bg-brand-bg p-6 md:py-16 gap-8 text-brand-body">
			<Image
				src={Flower4216}
				alt="flower"
				height={150}
				className="flex md:hidden"
			/>

			<p className="uppercase font-header tracking-wide text-4xl text-center max-w-sm font-semibold">
				Wedding Gifts
			</p>

			<div className="flex items-center justify-center gap-8 flex-col md:flex-row mt-8 md:mt-12">
				<Image src={names} alt="names" width={600} />
			</div>

			<div className="bg-gift text-brand-bg px-4 py-8 relative flex flex-col justify-center">
				<Image
					src={flowerAside}
					alt="flower"
					height={400}
					className="hidden md:flex md:absolute md:-translate-x-[200%] md:-top-1/2"
				/>

				<p className="text-center text-pretty font-header font-light">
					As we exchange our vows here today,
				</p>
				<p className="text-center text-pretty font-header font-light mb-4">
					Your presence brings us joy and strength to stay.
				</p>

				<p className="text-center text-pretty font-header font-light">
					But if you wish to give us more,
				</p>
				<p className="text-center text-pretty font-header font-light mb-4">
					A little help we would adore.
				</p>

				<p className="text-center text-pretty font-header font-light">
					To build a home, to start anew,
				</p>
				<p className="text-center text-pretty font-header font-light mb-4">
					Your endowment would be a dream come true.
				</p>

				<p className="text-center text-pretty font-header font-light">
					We desire no gifts of grandoise,
				</p>
				<p className="text-center text-pretty font-header font-light mb-4">
					Nor things unused that drift and doze.
				</p>

				<p className="text-center text-pretty font-header font-light">
					As we embark on a new life a ONE,
				</p>
				<p className="text-center text-pretty font-header font-light mb-4">
					A cash gift helps our journey begun.
				</p>
			</div>
		</div>
	);
}
