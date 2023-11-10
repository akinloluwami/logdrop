import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { BsCheckAll } from "react-icons/bs";

const Pricing = () => {
  const [requests, setRequests] = useState(15_000);

  const formatWithComma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const steps = [
    15_000, 20_000, 25_000, 30_000, 35_000, 40_000, 50_000, 60_000, 70_000,
    80_000, 90_000, 100_000, 150_000, 200_000, 250_000, 700_000, 800_000,
    900_000, 1_000_000, 1_100_000, 1_200_000, 1_300_000, 1_400_000, 1_500_000,
    1_600_000, 1_700_000, 1_800_000, 1_900_000, 2_000_000, 2_100_000, 2_200_000,
    2_300_000, 2_400_000, 2_500_000, 3_000_000, 3_500_000, 4_000_000, 5_000_000,
    8_500_000, 9_000_000, 10_000_000,
  ];

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(e.target.value);
    const exponent = sliderValue / 1000;
    const newValue = Math.pow(10, exponent);
    const closestTier = steps.reduce((prev, curr) => {
      return Math.abs(curr - newValue) < Math.abs(prev - newValue)
        ? curr
        : prev;
    });
    setRequests(closestTier);
  };

  const pricingRanges = [
    { min: 15_000, max: 40_000, price: 10 },
    { min: 50_000, max: 100_000, price: 20 },
    { min: 150_000, max: 250_000, price: 50 },
    { min: 700_000, max: 1_300_000, price: 80 },
    { min: 1_400_000, max: 2_300_000, price: 150 },
    { min: 2_400_000, max: 3_500_000, price: 200 },
    { min: 4_000_000, max: 5_000_000, price: 350 },
    { min: 8_500_000, max: 10_000_000, price: 500 },
  ];

  const calculatePrice = () => {
    for (const range of pricingRanges) {
      if (requests >= range.min && requests <= range.max) {
        return range.price;
      }
    }
    return 0;
  };

  const tiers = [
    {
      name: "Basic",
      price: "$0/mo",
      features: [
        {
          text: "Up to 10,000 requests per month",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "2 APIs",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "30-day data retention",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Email/X support",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        // {
        //   text: "100 event triggers/month",
        //   icon: <BsCheckAll className="text-xl text-green-500" />,
        // },
        {
          text: "2 team members (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Email/Slack alerts (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
      ],
      cta: {
        text: "Get Started",
        link: "/signup",
      },
    },
    {
      name: "Pro",
      price: `$${calculatePrice()}/mo`,
      features: [
        {
          text: "50 APIs",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Unlimited data retention",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Email, Slack & X support",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        // {
        //   text: "",
        //   icon: <BsCheckAll className="text-xl text-green-500" />,
        // },
        {
          text: "Unlimited team members (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Weekly/Monthly usage report (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Email/Slack alerts (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
      ],
      cta: {
        text: "Get Started",
        link: "/signup",
      },
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        {
          text: "Everything in Pro",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Unlimited APIs",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "24/7/365 Priority support",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Dedicated success engineer",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Priority Feature Requests",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
        {
          text: "Unlimited team members (soon)",
          icon: <BsCheckAll className="text-xl text-green-500" />,
        },
      ],
      cta: {
        text: "Get In Touch",
        link: "mailto:akin@logdrop.co",
      },
    },
  ];

  return (
    <div className="">
      <Head>
        <title>Pricing • LogDrop</title>
      </Head>
      <Navbar />
      <div className="mt-10">
        <h1 className="lg:text-6xl text-4xl text-center">
          Pricing that scales with you.
        </h1>

        <div className="flex items-center justify-center mt-16 lg:px-14 px-4 lg:gap-10 gap-14 flex-wrap">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`py-4 lg:w-[350px] w-full border border-white/10 rounded-xl flex flex-col items-center ${
                tier.name === "Pro" &&
                "shadow-md shadow-purple-500/40 hover:shadow-lg hover:shadow-purple-500/70 transition-all"
              }`}
            >
              <p className="text-lg font-semibold">{tier.name}</p>
              <h3 className="my-5 text-4xl">{tier.price}</h3>
              <div className="w-full mt-5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
              {tier.name !== "Pro" && <div className="h-3 mt-5 w-full"></div>}
              {tier.name === "Pro" && (
                <>
                  <input
                    type="range"
                    min={Math.log10(steps[0]) * 1000}
                    max={Math.log10(steps[steps.length - 1]) * 1000}
                    className="w-[85%] mt-5"
                    onChange={handleSliderChange}
                    value={Math.log10(requests) * 1000}
                  />
                  <p className="mt-3 text-gray-400 font-semibold">
                    {formatWithComma(requests)} requests per month
                  </p>
                </>
              )}
              {(tier.name === "Basic" || tier.name === "Enterprise") && (
                <p className="my-3 text-gray-400 font-semibold">
                  {tier.name === "Basic"
                    ? "Up to 2,000 requests per month"
                    : "Tailored to your specific needs"}
                </p>
              )}
              <div className="w-full mt-5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="my-10 flex flex-col gap-5 items-start w-[80%]">
                {tier.features.map((feature, index) => (
                  <div className="flex items-center gap-1" key={index}>
                    {feature.icon} {feature.text}
                  </div>
                ))}
              </div>
              <Link
                href={tier.cta.link}
                className="bg-gradient-to-r from-purple-500 to-purple-800 py-4 w-[95%] text-center rounded-full"
              >
                {tier.cta.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
