"use client";

import React from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, ICloud } from "react-icon-cloud";

const iconSlugs = [
  "python",
  "c",
  "javascript",
  "typescript",
  "mysql",
  "nextdotjs",
  "tailwindcss",
  "html5",
  "css3",
  "postgresql",
  "sql",
  "github",
  "canva",
  "figma"
];

export default function SkillGlobe() {
  const [icons, setIcons] = React.useState<any>(null);

  React.useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then((data) => {
      const renderedIcons = Object.values(data.simpleIcons).map((icon) =>
        renderSimpleIcon({
          icon,
          size: 28,
          aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
          },
        })
      );
      setIcons(renderedIcons);
    });
  }, []);

  const cloudProps: Omit<ICloud, "children"> = {
    canvasProps: {
      style: {
        width: 300,
        height: 300,
      },
    },
    containerProps: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: 8,
      },
    },
    options: {
      reverse: true,
      depth: 1,
      wheelZoom: false,
      imageScale: 3,
      activeCursor: "grab",
      dragControl: true,
      tooltip: "native",
      initial: [0.1, -0.1],
      clickToFront: 500,
      tooltipDelay: 0,
      outlineColour: "#0000",
      maxSpeed: 0.002,
      minSpeed: 0,
    },
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[300px]">
      {icons ? (
        <Cloud {...cloudProps}>{icons}</Cloud>
      ) : (
        <div className="text-slate-500 text-sm animate-pulse"></div>
      )}
    </div>
  );
}