/**
 * Waitlist / Early Access Page
 *
 * This page allows users to express interest in GistUp by joining the waitlist.
 * Captures minimal information (email required, name optional) securely.
 */

import { Section } from "@/components/ui";
import { WaitlistHero, WaitlistForm } from "@/components/waitlist";
import { waitlistContent } from "@/content/waitlist";

export const metadata = {
  title: "Get Early Access | GistUp",
  description:
    "Join the GistUp waitlist to get early access and be among the first to transform your bookmarks into daily audio briefings.",
};

export default function WaitlistPage() {
  return (
    <>
      <Section spacing="lg" background="secondary">
        <WaitlistHero content={waitlistContent.hero} className="mb-8 md:mb-12" />
      </Section>

      <Section spacing="lg" background="main">
        <div className="max-w-md mx-auto">
          <WaitlistForm content={waitlistContent.form} />
        </div>
      </Section>
    </>
  );
}
