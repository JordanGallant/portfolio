"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedContainer } from "@/components/shared/animated-container";
import { Shield, Link as LinkIcon, Music } from "lucide-react";

const skills = [
  "Penetration Testing",
  "Smart Contract Auditing",
  "Solidity",
  "Rust",
  "Python",
  "TypeScript",
  "Web3",
  "Reverse Engineering",
  "Network Security",
  "OSINT",
  "DeFi",
  "Blockchain Architecture",
];

const interests = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Exploring vulnerabilities, ethical hacking, and building more secure systems.",
    color: "neon-green",
  },
  {
    icon: LinkIcon,
    title: "Blockchain",
    description:
      "Developing decentralized applications and auditing smart contracts for security.",
    color: "neon-cyan",
  },
  {
    icon: Music,
    title: "Music & DJing",
    description:
      "Producing electronic music and performing DJ sets — a creative outlet beyond code.",
    color: "neon-green",
  },
];

const profileData = {
  name: "Jordan Gallant",
  age: 24,
  origin: "South Africa",
  based_in: "Utrecht, The Netherlands",
  focus: ["Cybersecurity", "Blockchain", "Web3"],
  status: "Building the future",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="ABOUT_ME" />

      {/* Terminal Window */}
      <AnimatedContainer>
        <Card className="bg-cyber-card border-cyber-border overflow-hidden mb-12">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-cyber-dark border-b border-cyber-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground">
              jordan@portfolio:~
            </span>
          </div>
          <CardContent className="p-6">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>
                <span className="text-neon-green">$</span> cat profile.json
                {"\n\n"}
                <span className="text-neon-cyan">{"{"}</span>
                {"\n"}
                {"  "}&quot;<span className="text-neon-green">name</span>&quot;:{" "}
                &quot;
                <span className="text-foreground">{profileData.name}</span>
                &quot;,{"\n"}
                {"  "}&quot;<span className="text-neon-green">age</span>&quot;:{" "}
                <span className="text-orange-400">{profileData.age}</span>,
                {"\n"}
                {"  "}&quot;<span className="text-neon-green">origin</span>
                &quot;: &quot;
                <span className="text-foreground">{profileData.origin}</span>
                &quot;,{"\n"}
                {"  "}&quot;<span className="text-neon-green">based_in</span>
                &quot;: &quot;
                <span className="text-foreground">{profileData.based_in}</span>
                &quot;,{"\n"}
                {"  "}&quot;<span className="text-neon-green">focus</span>
                &quot;: [&quot;
                <span className="text-foreground">
                  {profileData.focus.join('", "')}
                </span>
                &quot;],{"\n"}
                {"  "}&quot;<span className="text-neon-green">status</span>
                &quot;: &quot;
                <span className="text-foreground">{profileData.status}</span>
                &quot;{"\n"}
                <span className="text-neon-cyan">{"}"}</span>
              </code>
            </pre>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Bio */}
      <AnimatedContainer delay={0.1}>
        <div className="space-y-4 mb-12 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a cybersecurity researcher and blockchain developer from
            South Africa, currently based in Utrecht, The Netherlands, with a
            deep passion for technology and its intersection with security. My journey started with curiosity about
            how systems work — and how they break.
          </p>
          <p>
            Today, I focus on penetration testing, smart contract auditing, and
            building decentralized applications. I believe in responsible
            disclosure and making the digital world safer for everyone.
          </p>
          <p>
            When I&apos;m not breaking or building things, you&apos;ll find me
            behind the decks DJing, producing music, or exploring the latest in
            Web3 technology.
          </p>
        </div>
      </AnimatedContainer>

      {/* Skills */}
      <AnimatedContainer delay={0.2}>
        <h3 className="text-lg font-bold text-neon-green mb-4">
          <span className="text-muted-foreground">&gt; </span>SKILLS
        </h3>
        <div className="flex flex-wrap gap-2 mb-12">
          {skills.map((skill, i) => (
            <Badge
              key={skill}
              variant="outline"
              className={`${
                i % 2 === 0
                  ? "border-neon-green/50 text-neon-green hover:bg-neon-green/10"
                  : "border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
              } transition-colors`}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </AnimatedContainer>

      {/* I Bring The Heat */}
      <AnimatedContainer delay={0.3}>
        <h3 className="text-lg font-bold text-neon-green mb-4">
          <span className="text-muted-foreground">&gt; </span>I_BRING_THE_HEAT
        </h3>
        <Card className="bg-cyber-card border-cyber-border overflow-hidden mb-12">
          <div className="relative aspect-video overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/flames.gif"
              alt="DJ flames"
              className="w-full h-full object-cover scale-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xl md:text-2xl font-bold text-neon-green text-glow-green mb-2">
                I bring the heat.
              </p>
            </div>
          </div>
          <CardContent className="p-6 space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Music runs through everything I do. When I&apos;m not deep in code
              or hunting vulnerabilities, you&apos;ll find me behind the decks
              mixing records or in the studio cooking up new tracks.
            </p>
            <p>
              DJing and producing are my creative outlets — the place where
              technical precision meets raw expression. I love blending genres,
              layering textures, and creating moments on the dancefloor that
              people don&apos;t forget. Whether it&apos;s a late-night set at a
              warehouse or a bedroom session experimenting with sound design,
              music is where I feel most alive.
            </p>
            <p>
              It&apos;s also where my tech and creative worlds collide — building
              custom audio tools, hacking together MIDI controllers, and pushing
              the boundaries of what&apos;s possible with sound in the browser.
            </p>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Interests */}
      <AnimatedContainer delay={0.4}>
        <h3 className="text-lg font-bold text-neon-green mb-4">
          <span className="text-muted-foreground">&gt; </span>INTERESTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <Card
              key={interest.title}
              className="bg-cyber-card border-cyber-border hover:border-neon-green/50 transition-all duration-300 hover:shadow-neon-green"
            >
              <CardContent className="p-6">
                <interest.icon
                  className={`w-8 h-8 mb-3 ${
                    interest.color === "neon-green"
                      ? "text-neon-green"
                      : "text-neon-cyan"
                  }`}
                />
                <h4 className="font-bold text-foreground mb-2">
                  {interest.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {interest.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
