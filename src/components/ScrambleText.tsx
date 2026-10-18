"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SIZES = [
  { letters: "ijl", symbols: "ijl!" },
  { letters: "acdoun", symbols: "cdon" },
  { letters: "rtf", symbols: "rtf" },
  { letters: "mw", symbols: "mw" },
];
const MEDIUM_SYMBOLS = "+?&$#aceosnuxzk";
const CHANGE_CHANCE = 0.5;
const FRESH = 4;

const pick = (symbols: string) => symbols[Math.floor(Math.random() * symbols.length)];

const symbolsFor = (char: string) => SIZES.find(({ letters }) => letters.includes(char))?.symbols ?? MEDIUM_SYMBOLS;

const scramble = (target: string, revealed: number, previous: string) =>
  target
    .split("")
    .map((char, index) => {
      if (index < revealed || char === " ") return char;
      const symbols = symbolsFor(char);
      const kept = previous[index];
      return kept && symbols.includes(kept) && Math.random() > CHANGE_CHANCE ? kept : pick(symbols);
    })
    .join("");

type Props = {
  children: string | null;
  placeholder?: string;
  cycle_per_letter?: number;
  shuffle_time?: number;
};

export default function ScrambleText({ children, placeholder = "", cycle_per_letter = 2, shuffle_time = 50 }: Props) {
  const loading = children === null;
  const target = children ?? placeholder;
  const [{ text, revealed }, setFrame] = useState({ text: "", revealed: 0 });

  useEffect(() => {
    let pos = 0;
    let current = "";
    const tick = () => {
      if (loading) {
        scramble(target, 0, current);
        setFrame({ text: current, revealed: 0 });
        return;
      }
      const revealed = Math.floor(pos / cycle_per_letter);
      current = scramble(target, revealed, current);
      setFrame({ text: current, revealed });
      pos++;
      if (revealed >= target.length + FRESH) clearInterval(intervalId);
    };

    const intervalId = setInterval(tick, shuffle_time);
    tick();

    return () => clearInterval(intervalId);
  }, [target, loading, cycle_per_letter, shuffle_time]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, ease: "easeOut" }}>
      <span aria-hidden="true">
        {text.slice(0, Math.max(0, revealed - FRESH))}
        <span className="text-[color-mix(in_oklab,var(--main-text),var(--secondary-text))]">
          {text.slice(Math.max(0, revealed - FRESH), Math.min(revealed, text.length))}
        </span>
        <span className="text-secondary-text">{text.slice(revealed)}</span>
      </span>
      {!loading && <span className="sr-only">{target}</span>}
    </motion.div>
  );
}
