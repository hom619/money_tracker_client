import React, { useEffect, useState } from "react";
import { TbPigMoney } from "react-icons/tb";
const financialTips = [
  {
    expert: "Warren Buffett",
    tip: "Live below your means and invest the difference.",
    quote:
      "Do not save what is left after spending, but spend what is left after saving.",
  },
  {
    expert: "Dave Ramsey",
    tip: "Avoid debt and pay with cash whenever possible.",
    quote:
      "You must gain control over your money or the lack of it will forever control you.",
  },
  {
    expert: "Robert Kiyosaki",
    tip: "Focus on building assets, not just earning income.",
    quote:
      "It’s not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
  },
  {
    expert: "Suze Orman",
    tip: "Have an emergency fund that covers at least 8 months of expenses.",
    quote:
      "A big part of financial freedom is having your heart and mind free from worry about the what-ifs of life.",
  },
  {
    expert: "Tony Robbins",
    tip: "Automate your savings and investments.",
    quote:
      "The secret to wealth is simple: Find a way to do more for others than anyone else does.",
  },
  {
    expert: "Benjamin Graham",
    tip: "Invest with a margin of safety and focus on value.",
    quote:
      "The individual investor should act consistently as an investor and not as a speculator.",
  },
  {
    expert: "Peter Lynch",
    tip: "Invest in what you understand and believe in for the long-term.",
    quote: "Know what you own, and know why you own it.",
  },
  {
    expert: "JL Collins",
    tip: "Invest in low-cost index funds for long-term growth.",
    quote: "The market is the most powerful wealth-building tool of all time.",
  },
  {
    expert: "Ramsey Solutions",
    tip: "Create a zero-based monthly budget to tell every dollar where to go.",
    quote:
      "A budget is telling your money where to go instead of wondering where it went.",
  },
  {
    expert: "Morgan Housel",
    tip: "Understand that financial success is more about behavior than knowledge.",
    quote:
      "Spending money to show people how much money you have is the fastest way to have less money.",
  },
];
export const FinancialTips = () => {
  const [showTips, setShowTips] = useState(financialTips[0]);
  const { expert, tip, quote } = showTips;
  useEffect(() => {
    setInterval(() => {
      setShowTips(
        financialTips[Math.floor(Math.random() * financialTips.length)]
      );
    }, 3000);
  }, []);
  return (
    <div
      className="bg-white border rounded d-flex flex-column justify-content-center"
      style={{ height: "100%" }}
    >
      <div className="signUpBackground mb-3"></div>
      <h4 style={{ color: "#2e8b57", margin: "10px" }}>{tip}</h4>
      <div className="fw-bolder text-secondary m-2">
        "{quote}" - {expert}
      </div>
    </div>
  );
};
