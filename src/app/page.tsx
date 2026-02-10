"use client";

import { useState, useCallback, useEffect } from "react";

const QUIRKY_MESSAGES = [
  "Are you sure? 🥺",
  "Really really sure? 😢",
  "Think about it... 💭",
  "Pretty please? 🥹",
  "You're breaking my heart! 💔",
];

const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ff2d78",
  "#ff6f61",
  "#ffd93d",
  "#c3aed6",
  "#ff9a9e",
  "#a18cd1",
  "#fbc2eb",
  "#f6d365",
  "#fda085",
];

function FloatingHearts() {
  return (
    <div className="hearts-bg">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="heart">
          {["💕", "💗", "💖", "💘", "❤️", "💝", "💞", "💓", "🩷", "♥️"][i]}
        </div>
      ))}
    </div>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState<
    {
      id: number;
      left: string;
      color: string;
      delay: string;
      duration: string;
      size: number;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      size: 6 + Math.random() * 10,
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            width: piece.size,
            height: piece.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [messageKey, setMessageKey] = useState(0);

  const getRandomPosition = useCallback(() => {
    const btnWidth = 160;
    const btnHeight = 50;
    const padding = 20;

    const maxLeft = window.innerWidth - btnWidth - padding;
    const maxTop = window.innerHeight - btnHeight - padding;

    return {
      top: Math.max(padding, Math.random() * maxTop),
      left: Math.max(padding, Math.random() * maxLeft),
    };
  }, []);

  const handleNo = useCallback(() => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    setMessageKey((prev) => prev + 1);

    if (newCount <= 5) {
      setNoPosition(getRandomPosition());
    } else {
      // After 5 clicks, button becomes "Fine, I got no other choice"
      // Move it back to normal position
      setNoPosition(null);
    }
  }, [noCount, getRandomPosition]);

  const handleFinalNo = useCallback(() => {
    setAccepted(true);
  }, []);

  const yesScale = 1 + noCount * 0.12;
  const noScale = Math.max(0.4, 1 - noCount * 0.1);
  const isFinalNo = noCount > 5;

  if (accepted) {
    return (
      <>
        <Confetti />
        <FloatingHearts />
        <div className="success-container">
          <div className="success-card">
            <h1 className="success-title">7 Croreeeeeeeee</h1>
            <p className="success-subtitle">
              You just made me the happiest person ever! 🥰
            </p>
            <video
              src="/assets/vid1.MP4"
              className="success-image"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="gallery-section">
            <h2 className="gallery-title">Been a journey .. 💕</h2>
            <div className="photo-collage">
              <div className="polaroid polaroid-2">
                <img src="/assets/img2.JPEG" alt="Us 2" />
                <span className="polaroid-caption">🥰</span>
              </div>
              <div className="polaroid polaroid-3">
                <img src="/assets/img3.JPEG" alt="Us 3" />
                <span className="polaroid-caption">✨</span>
              </div>
              <div className="polaroid polaroid-4">
                <img src="/assets/img4.JPEG" alt="Us 4" />
                <span className="polaroid-caption">💗</span>
              </div>
              <div className="polaroid polaroid-5">
                <img src="/assets/img5.JPEG" alt="Us 5" />
                <span className="polaroid-caption">💕</span>
              </div>
              <div className="polaroid polaroid-6">
                <img src="/assets/img6.JPEG" alt="Us 6" />
                <span className="polaroid-caption">💖</span>
              </div>
              <div className="polaroid polaroid-7">
                <img src="/assets/img7.JPEG" alt="Us 7" />
                <span className="polaroid-caption">💖</span>
              </div>
              <div className="polaroid polaroid-8">
                <img src="/assets/img8.JPEG" alt="Us 8" />
                <span className="polaroid-caption">💖</span>
              </div>
              <div className="polaroid polaroid-9">
                <img src="/assets/img9.JPEG" alt="Us 9" />
                <span className="polaroid-caption">💖</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FloatingHearts />
      <div className="valentine-container">
        <div className="question-card">
          <p className="greeting-text">Hello baby 🧸</p>
          <p className="question-subtitle">
            I have a very important question for you... 💌
          </p>
          <div className="polaroid polaroid-main">
            <img src="/assets/img1.JPEG" alt="Us 1" />
            <span className="polaroid-caption">💖</span>
          </div>
          <h1 className="question-title">Will you be my Valentine?</h1>

          {noCount > 0 && noCount <= 5 && (
            <p className="quirky-message" key={messageKey}>
              {QUIRKY_MESSAGES[noCount - 1]}
            </p>
          )}

          {isFinalNo && (
            <p className="quirky-message" key={messageKey}>
              Okay okay, last chance... 🫣
            </p>
          )}

          <div className="buttons-container">
            <button
              className="btn-yes"
              onClick={() => setAccepted(true)}
              style={{
                transform: `scale(${yesScale})`,
              }}
            >
              Yes! 💖
            </button>

            {!isFinalNo ? (
              <button
                className={`btn-no ${noPosition ? "btn-no-runaway" : ""}`}
                onClick={handleNo}
                style={{
                  transform: `scale(${noScale})`,
                  ...(noPosition
                    ? {
                        top: noPosition.top,
                        left: noPosition.left,
                      }
                    : {}),
                }}
              >
                No 😅
              </button>
            ) : (
              <button className="btn-no btn-no-final" onClick={handleFinalNo}>
                Fine, I got no other choice 😌
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
