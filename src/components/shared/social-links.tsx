"use client";

import { Twitter, Instagram, Music, Github } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/JordanGallant",
    icon: Github,
  },
  {
    name: "Twitter",
    url: "https://x.com/0xJordanG",
    icon: Twitter,
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/jordan-867365838",
    icon: Music,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/jgsleepyzz",
    icon: Instagram,
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-neon-green hover:text-glow-green transition-all duration-300 hover:scale-110"
          aria-label={social.name}
        >
          <social.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
