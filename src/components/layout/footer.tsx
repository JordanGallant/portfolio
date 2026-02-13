import { SocialLinks } from "@/components/shared/social-links";

export function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-dark/50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Jordan Gallant. All rights
            reserved.
          </div>
          <SocialLinks />
          <div className="text-sm text-muted-foreground">
            <span className="text-neon-green/50">&gt; EOF_</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
