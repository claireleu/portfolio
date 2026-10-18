"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    children: string;
    start_pause?: number;
    end_pause?: number;
    pause_pause?: number;
    base_typing_speed?: number;
    pauses?: number[];
    onTyped?: () => void;
    onDone?: () => void;
};

const NO_PAUSES: number[] = [];

type Phase ="start" | "typing" | "pause" | "end" | "backspacing" | "done";

export default function Typewriter({
    children,
    start_pause = 2000,
    end_pause = 2000,
    pause_pause = 900,
    base_typing_speed = 28,
    pauses = NO_PAUSES,
    onTyped,
    onDone,
}: Props) {
    const [text, setText] = useState("");
    const [phase, setPhase] = useState<Phase>("start");

    useEffect(() => {
        let pos = 0;
        let back_pos = children.length
        let timeoutId: ReturnType<typeof setTimeout>;
        setText("");
        setPhase("start");
        timeoutId = setTimeout(() => {
            setPhase("typing");
            let typing_speed = base_typing_speed + Math.random() * 110

            const backspaceNext = () => {
                back_pos--;
                setText(children.slice(0, back_pos));
                if (back_pos > 0) {
                    timeoutId = setTimeout(backspaceNext, base_typing_speed);
                } else {
                    setPhase("done");
                    onDone?.();
                }
            };

            const typeNext = () => {
                pos++;
                setText(children.slice(0, pos));
                const typing_speed = base_typing_speed + Math.random() * 110;

                if (pos < children.length) {
                    let delay: number;

                    if (pauses.includes(pos)) {
                        setPhase("pause");
                        delay = pause_pause;
                    } else {
                        setPhase("typing");
                        delay = typing_speed;
                    }

                    timeoutId = setTimeout(typeNext, delay);
                } else {
                    back_pos = children.length;
                    setPhase("end");
                    onTyped?.();
                    timeoutId = setTimeout(() => {
                        setPhase("backspacing");
                        timeoutId = setTimeout(backspaceNext, base_typing_speed);
                    }, end_pause);
                }
            };

            if (children.length > 0) {
                timeoutId = setTimeout(typeNext, typing_speed);
            } else {
                setPhase("end");
                timeoutId = setTimeout(() => {
                    setPhase("backspacing");
                    timeoutId = setTimeout(backspaceNext, base_typing_speed);
                }, end_pause);
            }
        }, start_pause);

        return () => clearTimeout(timeoutId);
    
    }, [children, start_pause, end_pause, base_typing_speed, pauses]);

    const isBlinking =
    phase === "start" || phase === "pause" || phase === "end" || phase === "backspacing";

  return (
    <div>
      <span>{text}</span>

      <motion.span
        animate={
          isBlinking
            ? { opacity: [1, 1, 0, 0] }
            : { opacity: 1 }
        }
        transition={
          isBlinking
            ? {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 0.5, 1],
              }
            : { duration: 0 }
        }
      >
        |
      </motion.span>

      <span className="sr-only">{children}</span>
    </div>
  );
}