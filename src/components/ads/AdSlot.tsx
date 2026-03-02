'use client';

import { useEffect, useRef } from 'react';
import { AD_CONFIG } from '@/lib/config';
import { useAdsConsent } from '@/components/ui/ConsentBanner';

// All code comments are in English as requested by the project convention.

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Position = 'top' | 'mid' | 'bottom';

type Props = {
  position: Position;
  className?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
};

function isValidPublisherId(id: string) {
  return /^ca-pub-\d{10,}$/.test(id);
}

function isValidSlotId(id: string) {
  return /^\d{5,}$/.test(id);
}

function ensureAdsenseScript(client: string) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('adsense-script')) return;

  const s = document.createElement('script');
  s.id = 'adsense-script';
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

function getSlot(position: Position) {
  if (position === 'top') return AD_CONFIG.SLOTS.TOP;
  if (position === 'mid') return AD_CONFIG.SLOTS.MID;
  return AD_CONFIG.SLOTS.BOTTOM;
}

export function AdSlot({ position, className, format = 'auto' }: Props) {
  const ref = useRef<HTMLModElement | null>(null);
  const hasConsent = useAdsConsent();

  const client = AD_CONFIG.PUBLISHER_ID;
  const slot = getSlot(position);

  useEffect(() => {
    if (!AD_CONFIG.ENABLED) return;
    if (!hasConsent) return;
    if (!isValidPublisherId(client) || !isValidSlotId(slot)) return;

    ensureAdsenseScript(client);

    const push = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // ignore
      }
    };

    const t = window.setTimeout(push, 500);
    return () => window.clearTimeout(t);
  }, [hasConsent, client, slot]);

  if (!AD_CONFIG.ENABLED) return null;
  if (!hasConsent) return null;
  if (!isValidPublisherId(client) || !isValidSlotId(slot)) return null;

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block overflow-hidden rounded-2xl bg-white shadow-soft ${className ?? ''}`}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
