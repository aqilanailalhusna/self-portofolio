"use client";

import React from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, ICloud } from "react-icon-cloud";

const iconSlugs = [
  "python",
  "javascript",
  "typescript",
  "react",
  "nextdotjs",
  "tailwindcss",
  "html5",
  "css3",
  "postgresql",
  "sqlite",
  "git",
  "github",
  "amazonwebservices",
  "scikitlearn",
  "pandas",
  "numpy",
];

export default function SkillGlobe() {
  const [icons, setIcons] = React.useState<any>(null);

  React.useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then((data) => {
      const renderedIcons = Object.values(data.simpleIcons).map((icon) =>
        renderSimpleIcon({
          icon,
          size: 42,
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
    containerProps: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
      },
    },
    options: {
      reverse: true,
      depth: 1,
      wheelZoom: false,
      imageScale: 2,
      activeCursor: "default",
      tooltip: "native",
      initial: [0.1, -0.1],
      clickToFront: 500,
      tooltipDelay: 0,
      outlineColour: "#0000",
      maxSpeed: 0.04,
      minSpeed: 0.02,
    },
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[300px]">
      {icons ? (
        <Cloud {...cloudProps}>{icons}</Cloud>
      ) : (
        <div className="text-slate-500 text-sm animate-pulse">Memuat Skill Globe...</div>
      )}
    </div>
  );
}