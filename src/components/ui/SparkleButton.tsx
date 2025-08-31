import React, { useState } from 'react';

export default function App() {
  return (
    <div className="w-fit h-fit flex items-center justify-center bg-gray-900">
      <SparkleButton />
    </div>
  );
}

const SparkleButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const styleSheet = `
    .sparkle-button {
      --color: #fc844dff; /* yellow-400 */
      --shadow: #b45309; /* amber-800 */
      --glare: hsl(0 0% 100% / 0.75);
      --font-size: 1.5rem; /* Equivalent to a large font size */
      --transition: 0.2s;
    }

    .sparkle-button > span {
      display: inline-block;
      font-size: var(--font-size);
      font-weight: 900;
      transition: all 0.2s;
      text-decoration: none;
      color: var(--color);
      transform: translate(calc(var(--hover, 0) * 0.10 * var(--font-size)), calc(var(--hover, 0) * -0.10 * var(--font-size)));
      text-shadow:
        calc(var(--hover, 0) * -0 * var(--font-size)) calc(var(--hover, 0) * 0 * var(--font-size)) var(--shadow),
        calc(var(--hover, 0) * -0.02 * var(--font-size)) calc(var(--hover, 0) * 0.02 * var(--font-size)) var(--shadow),
        calc(var(--hover, 0) * -0.04 * var(--font-size)) calc(var(--hover, 0) * 0.04 * var(--font-size)) var(--shadow),
        calc(var(--hover, 0) * -0.06 * var(--font-size)) calc(var(--hover, 0) * 0.06 * var(--font-size)) var(--shadow),
        calc(var(--hover, 0) * -0.08 * var(--font-size)) calc(var(--hover, 0) * 0.08 * var(--font-size)) var(--shadow),
        calc(var(--hover, 0) * -0.10 * var(--font-size)) calc(var(--hover, 0) * 0.10 * var(--font-size)) var(--shadow);
    }
    
    .sparkle-button > span:last-of-type {
      position: absolute;
      inset: 0.5rem;
      background: linear-gradient(
        108deg,
        transparent 0 55%,
        var(--glare) 55% 60%,
        transparent 60% 70%,
        var(--glare) 70% 85%,
        transparent 85%
      ) calc(var(--pos, 0) * -200%) 0% / 200% 100%, var(--color);
      -webkit-background-clip: text;
      color: transparent;
      z-index: 2;
      text-shadow: none;
      transform: translate(calc(var(--hover, 0) * 0.10 * var(--font-size)), calc(var(--hover, 0) * -0.10 * var(--font-size)));
      transition: transform 0.2s, background-position 0s;
    }

    .sparkle-button:hover > span:last-of-type {
      transition: transform 0.2s, background-position calc(var(--hover) * 1.5s) calc(var(--hover) * 0.25s);
    }

    @keyframes sparkle {
      50% {
        transform: translate(-50%, -50%) scale(var(--s, 1));
      }
    }

    .sparkle-button > svg {
      position: absolute;
      z-index: 3;
      width: calc(var(--font-size) * 0.5);
      aspect-ratio: 1;
      --delay-step: 0.15;
      transform: translate(-50%, -50%) scale(0);
    }

    .sparkle-button > svg path {
      fill: var(--glare);
    }

    .sparkle-button:hover > svg {
      animation: sparkle 0.75s calc((var(--delay-step) * var(--d)) * 1s) both;
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>
      <div
        className="relative p-2 rounded-4xl no-underline transition-all hover:bg-gray-800 sparkle-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ '--hover': isHovered ? 1 : 0, '--pos': isHovered ? 1 : 0 } as React.CSSProperties}
      >
        <svg style={{'--x': 0, '--y': 20, '--s': 1.1, '--d': 1} as React.CSSProperties} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#000"/>
        </svg>
        <svg style={{'--x': 15, '--y': 80, '--s': 1.25, '--d': 2} as React.CSSProperties} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#000"/>
        </svg>
        <svg style={{'--x': 45, '--y': 40, '--s': 1.1, '--d': 3} as React.CSSProperties} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#000"/>
        </svg>
        <svg style={{'--x': 75, '--y': 60, '--s': 0.9, '--d': 2} as React.CSSProperties} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#000"/>
        </svg>
        <svg style={{'--x': 100, '--y': 30, '--s': 0.8, '--d': 4} as React.CSSProperties} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" fill="#000"/>
        </svg>
        <span className='cursor-pointer'>Register!</span>
        <span aria-hidden="true" className='cursor-pointer'>Register!</span>
      </div>
    </>
  );
};
