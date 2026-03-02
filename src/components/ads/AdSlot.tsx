'use client';

import { useEffect, useRef } from 'react';
import { AD_CONFIG } from '@/lib/config';
import { useMarketingConsent } from '@/components/ui/ConsentBanner';

interface AdSlotProps {
  /** top | mid | bottom */
  position: 'top' | 'mid' | 'bottom';
  className?: string;
}

/**
 * AdSlot – renders a Google AdSense unit ONLY when:
 * 1. AD_CONFIG.ENABLED is true (feature flag)
 * 2. User has accepted marketing cookies
 *
 * Always separated from form inputs, buttons and navigation by clear visual margin.
 * Labeled with "Anzeige" per DSGVO/UWG requirements.
 */
export function AdSlot({ position, className = '' }: AdSlotProps) {
  const consent = useMarketingConsent();
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!AD_CONFIG.ENABLED || !consent || pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet – handled by deferred injection
    }
  }, [consent]);

  if (!AD_CONFIG.ENABLED || !consent) return null;

  const slotId = AD_CONFIG.SLOTS[position.toUpperCase() as 'TOP' | 'MID' | 'BOTTOM'];

  return (
    <div
      ref={adRef}
      className={`ad-slot-wrapper ${className}`}
      role="complementary"
      aria-label="Werbeanzeige"
    >
      <p className="ad-label">Anzeige</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CONFIG.PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
