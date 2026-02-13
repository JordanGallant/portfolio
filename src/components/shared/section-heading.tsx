export function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-neon-green text-glow-green mb-8">
      <span className="text-muted-foreground">&gt; </span>
      {title}
      <span className="text-neon-green animate-blink">_</span>
    </h2>
  );
}
