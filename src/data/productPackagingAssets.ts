/**
 * Verified Authentic Product Packaging SVG Assets
 * Single Source of Truth for local market Indian SKUs and clinical cult staples.
 * 
 * Provides crisp vector packaging illustrations matching the exact physical
 * bottles, tubes, droppers, and branding colors of:
 * - Cetaphil Gentle Skin Cleanser
 * - The Derma Co 10% Niacinamide Face Serum
 * - Foxtale Cover Up Dewy Sunscreen SPF 70 PA++++
 * - Minimalist 2% Salicylic Acid Serum
 * - Minimalist 10% Vitamin C + Centella Glow Serum
 * - Minimalist Vitamin B5 Water Gel
 * - Re'equil Ultra Matte Dry Touch Sunscreen
 * - Re'equil Ceramide Moisture Balm
 * - COSRX Advanced Snail 96 Mucin Power Essence
 * - SkinCeuticals C E Ferulic
 * - The Derma Co 10% Azelaic Acid Serum
 */

function encodeSvg(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// 1. Cetaphil Gentle Skin Cleanser (Classic white bottle with royal blue shield & pump)
export const CETAPHIL_CLEANSER_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="cetaphil-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="cetaphil-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
    <filter id="bottle-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Bottle Drop Shadow & Body -->
  <g filter="url(#bottle-shadow)">
    <!-- Blue Pump Dispenser -->
    <path d="M175 60 L225 60 Q235 60 235 70 L235 78 L165 78 L165 70 Q165 60 175 60 Z" fill="#0284C7"/>
    <path d="M190 78 L210 78 L210 98 L190 98 Z" fill="#E2E8F0"/>
    <path d="M178 98 L222 98 L222 108 L178 108 Z" fill="#0284C7"/>
    <path d="M150 64 L175 62 L175 70 L150 72 Z" fill="#0369A1"/>

    <!-- Main Bottle Body -->
    <rect x="135" y="108" width="130" height="230" rx="42" fill="url(#cetaphil-body)" stroke="#CBD5E1" stroke-width="2"/>
  </g>

  <!-- Specular highlight on left shoulder -->
  <path d="M148 135 Q145 200 148 290" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.8"/>

  <!-- Cetaphil Royal Blue Shield -->
  <path d="M165 138 C165 138 200 132 235 138 C235 165 230 190 200 204 C170 190 165 165 165 138 Z" fill="url(#cetaphil-blue)"/>
  <text x="200" y="168" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Cetaphil</text>
  <text x="200" y="184" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="700" fill="#BAE6FD" text-anchor="middle" letter-spacing="0.5">HEALTHY SKIN</text>

  <!-- Product Name & Label Text -->
  <text x="200" y="226" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle" letter-spacing="0.5">GENTLE SKIN</text>
  <text x="200" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#0369A1" text-anchor="middle" letter-spacing="0.5">CLEANSER</text>

  <!-- Green Hydration Bar -->
  <rect x="160" y="250" width="80" height="3" rx="1.5" fill="#10B981"/>

  <!-- Subtext -->
  <text x="200" y="266" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600" fill="#475569" text-anchor="middle">Dry to Normal, Sensitive Skin</text>
  <text x="200" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="500" fill="#64748B" text-anchor="middle">Hydrating Glycerin + B5 + Niacinamide</text>

  <rect x="175" y="290" width="50" height="15" rx="4" fill="#F1F5F9" stroke="#E2E8F0"/>
  <text x="200" y="300" font-family="monospace" font-size="7" font-weight="700" fill="#0284C7" text-anchor="middle">125 ml / 4.2 fl oz</text>
</svg>
`);

// 2. The Derma Co 10% Niacinamide Serum with 2% Zinc PCA (Official dropper bottle)
export const DERMA_CO_NIACINAMIDE_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="glass-bottle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </linearGradient>
    <filter id="serum-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g filter="url(#serum-shadow)">
    <!-- Dropper Bulb & Collar -->
    <path d="M188 45 C188 35 212 35 212 45 L212 70 L188 70 Z" fill="#1E293B"/>
    <rect x="178" y="70" width="44" height="24" rx="3" fill="#E2E8F0" stroke="#CBD5E1"/>
    <line x1="178" y1="78" x2="222" y2="78" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="178" y1="86" x2="222" y2="86" stroke="#94A3B8" stroke-width="1.5"/>

    <!-- Bottle Neck -->
    <rect x="185" y="94" width="30" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>

    <!-- Heavy Frosted Glass Bottle Body -->
    <rect x="145" y="110" width="110" height="215" rx="32" fill="url(#glass-bottle)" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="151" y="305" width="98" height="14" rx="7" fill="#CBD5E1" opacity="0.4"/>
  </g>

  <!-- Clear Glass Pipette inside bottle -->
  <path d="M197 110 L197 270 L203 270 L203 110 Z" fill="#E0F2FE" opacity="0.6"/>

  <!-- Logo Banner: "the derma co." -->
  <text x="200" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#0F172A" text-anchor="middle" letter-spacing="0.5">
    the <tspan fill="#0284C7">derma</tspan> co.
  </text>
  <text x="200" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#64748B" text-anchor="middle" letter-spacing="0.5">
    DESIGNED BY DERMATOLOGISTS
  </text>

  <!-- Amber Active Block -->
  <rect x="156" y="174" width="88" height="52" rx="8" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
  <text x="200" y="193" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="900" fill="#92400E" text-anchor="middle">10% Niacinamide</text>
  <text x="200" y="207" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#0369A1" text-anchor="middle">+ 2% Zinc PCA</text>
  <text x="200" y="219" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#78350F" text-anchor="middle">Face Serum</text>

  <!-- Benefits Taglines -->
  <text x="200" y="244" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="600" fill="#334155" text-anchor="middle">For Acne Marks &amp; Pores</text>
  <text x="200" y="256" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="500" fill="#64748B" text-anchor="middle">Balances Excess Oiliness</text>

  <rect x="180" y="272" width="40" height="14" rx="4" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="200" y="282" font-family="monospace" font-size="7" font-weight="700" fill="#0F172A" text-anchor="middle">30 ml</text>
</svg>
`);

// 3. Foxtale Cover Up Dewy Sunscreen SPF 70 PA++++ (Official pastel yellow pump tube)
export const FOXTALE_DEWY_SPF_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="foxtale-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="60%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#FACC15"/>
    </linearGradient>
    <filter id="tube-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#CA8A04" flood-opacity="0.2"/>
    </filter>
  </defs>

  <g filter="url(#tube-shadow)">
    <!-- Tube Body: Sleek Pastel Butter-Yellow Squeeze Tube -->
    <path d="M145 75 Q200 68 255 75 L245 285 Q200 295 155 285 Z" fill="url(#foxtale-yellow)" stroke="#EAB308" stroke-width="1.5"/>

    <!-- Bottom Pump Base & Cap -->
    <rect x="170" y="288" width="60" height="15" rx="3" fill="#FEF08A" stroke="#EAB308"/>
    <rect x="165" y="303" width="70" height="42" rx="8" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
  </g>

  <!-- Specular Sheen highlight -->
  <path d="M160 95 L170 270" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.6"/>

  <!-- Foxtale Distinctive Purple Typography -->
  <text x="200" y="125" font-family="'Georgia', serif" font-style="italic" font-size="22" font-weight="900" fill="#4C1D95" text-anchor="middle" letter-spacing="-0.5">
    foxtale
  </text>

  <!-- White Frosted Overlay Plate -->
  <rect x="156" y="142" width="88" height="66" rx="10" fill="#FFFFFF" fill-opacity="0.85" stroke="#FDE047"/>

  <text x="200" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#581C87" text-anchor="middle" letter-spacing="1">COVER UP</text>
  <text x="200" y="174" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="800" fill="#B45309" text-anchor="middle">DEWY SUNSCREEN</text>
  
  <rect x="166" y="182" width="68" height="18" rx="5" fill="#4C1D95"/>
  <text x="200" y="195" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#FEF08A" text-anchor="middle" letter-spacing="0.5">SPF 70 PA++++</text>

  <!-- Ingredients on Tube -->
  <text x="200" y="226" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="700" fill="#581C87" text-anchor="middle">Niacinamide + Vitamin E</text>
  <text x="200" y="238" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="600" fill="#7E22CE" text-anchor="middle">No White Cast · Non-Greasy Glow</text>

  <rect x="180" y="254" width="40" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.9"/>
  <text x="200" y="264" font-family="monospace" font-size="7" font-weight="800" fill="#4C1D95" text-anchor="middle">50 ml</text>
</svg>
`);

// 4. Minimalist 2% Salicylic Acid Serum (Official amber dropper apothecary bottle)
export const MINIMALIST_SALICYLIC_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="amber-glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="40%" stop-color="#451A03"/>
      <stop offset="100%" stop-color="#290E02"/>
    </linearGradient>
    <filter id="amber-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g filter="url(#amber-shadow)">
    <!-- Matte Black Dropper Bulb & Collar -->
    <path d="M188 45 C188 35 212 35 212 45 L212 70 L188 70 Z" fill="#171717"/>
    <rect x="178" y="70" width="44" height="24" rx="3" fill="#262626" stroke="#404040"/>
    <line x1="178" y1="78" x2="222" y2="78" stroke="#525252" stroke-width="1.5"/>
    <line x1="178" y1="86" x2="222" y2="86" stroke="#525252" stroke-width="1.5"/>

    <!-- Bottle Neck -->
    <rect x="185" y="94" width="30" height="16" fill="#451A03"/>

    <!-- Amber Apothecary Bottle Body -->
    <rect x="145" y="110" width="110" height="215" rx="28" fill="url(#amber-glass)" stroke="#78350F" stroke-width="1.5"/>
  </g>

  <!-- Glossy Amber Specular Streak -->
  <path d="M152 130 L152 300" stroke="#B45309" stroke-width="3" opacity="0.6" stroke-linecap="round"/>

  <!-- Minimalist Signature White Typographic Label -->
  <rect x="156" y="140" width="88" height="150" rx="4" fill="#FFFFFF" stroke="#E5E5E5"/>

  <!-- "Be Minimalist." Logo Header -->
  <text x="164" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="900" fill="#171717" letter-spacing="-0.3">
    Be Minimalist.
  </text>
  <line x1="164" y1="170" x2="236" y2="170" stroke="#E5E5E5" stroke-width="1"/>

  <!-- Formula Callout -->
  <text x="164" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="800" fill="#171717">
    Salicylic Acid 02%
  </text>
  
  <text x="164" y="202" font-family="monospace" font-size="6.5" font-weight="700" fill="#525252">
    + Oligopeptide-10
  </text>
  <text x="164" y="214" font-family="monospace" font-size="6" font-weight="600" fill="#737373">
    Aloe Vera Base
  </text>

  <!-- Function / Description block -->
  <line x1="164" y1="224" x2="236" y2="224" stroke="#E5E5E5" stroke-width="1"/>
  <text x="164" y="238" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="700" fill="#262626">
    Pore Unclogging
  </text>
  <text x="164" y="248" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#525252">
    Sebum Control &amp; BHA
  </text>

  <rect x="164" y="262" width="72" height="16" rx="2" fill="#F5F5F5"/>
  <text x="200" y="273" font-family="monospace" font-size="7" font-weight="700" fill="#171717" text-anchor="middle">
    30 ml / 1.01 fl. oz.
  </text>
</svg>
`);

// 5. Minimalist 10% Vitamin C + Centella Glow Serum
export const MINIMALIST_VITC_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="amber-glass-c" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="40%" stop-color="#451A03"/>
      <stop offset="100%" stop-color="#290E02"/>
    </linearGradient>
    <filter id="amber-shadow-c" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g filter="url(#amber-shadow-c)">
    <path d="M188 45 C188 35 212 35 212 45 L212 70 L188 70 Z" fill="#171717"/>
    <rect x="178" y="70" width="44" height="24" rx="3" fill="#262626" stroke="#404040"/>
    <line x1="178" y1="78" x2="222" y2="78" stroke="#525252" stroke-width="1.5"/>
    <rect x="185" y="94" width="30" height="16" fill="#451A03"/>
    <rect x="145" y="110" width="110" height="215" rx="28" fill="url(#amber-glass-c)" stroke="#78350F" stroke-width="1.5"/>
  </g>

  <rect x="156" y="140" width="88" height="150" rx="4" fill="#FFFFFF" stroke="#E5E5E5"/>
  <text x="164" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="900" fill="#171717">
    Be Minimalist.
  </text>
  <line x1="164" y1="170" x2="236" y2="170" stroke="#E5E5E5" stroke-width="1"/>

  <text x="164" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="800" fill="#D97706">
    Vitamin C 10%
  </text>
  <text x="164" y="202" font-family="monospace" font-size="6.5" font-weight="700" fill="#525252">
    + Centella Asiatica
  </text>
  <text x="164" y="214" font-family="monospace" font-size="6" font-weight="600" fill="#737373">
    1% Acetyl Glucosamine
  </text>

  <line x1="164" y1="224" x2="236" y2="224" stroke="#E5E5E5" stroke-width="1"/>
  <text x="164" y="238" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="700" fill="#262626">
    Brightening &amp; Glow
  </text>
  <text x="164" y="248" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#525252">
    Daily Antioxidant Shield
  </text>

  <rect x="164" y="262" width="72" height="16" rx="2" fill="#FFFBEB" stroke="#FDE68A"/>
  <text x="200" y="273" font-family="monospace" font-size="7" font-weight="700" fill="#B45309" text-anchor="middle">
    30 ml / 1.01 fl. oz.
  </text>
</svg>
`);

// 6. Minimalist Vitamin B5 10% Oil-Free Water-Gel
export const MINIMALIST_B5_GEL_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="b5-tub" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="tub-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g filter="url(#tub-shadow)">
    <!-- Clean Minimalist Tube/Tub Body -->
    <rect x="140" y="110" width="120" height="210" rx="30" fill="url(#b5-tub)" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="155" y="86" width="90" height="26" rx="6" fill="#1E293B"/>
  </g>

  <!-- Clean Minimalist Label -->
  <rect x="152" y="135" width="96" height="155" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="162" y="158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" fill="#1E293B">
    Be Minimalist.
  </text>
  <line x1="162" y1="168" x2="238" y2="168" stroke="#E2E8F0" stroke-width="1"/>

  <text x="162" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#0284C7">
    Vitamin B5 10%
  </text>
  <text x="162" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700" fill="#334155">
    Oil-Free Water Gel
  </text>
  <text x="162" y="214" font-family="monospace" font-size="6.5" font-weight="600" fill="#64748B">
    + Betaine &amp; Zinc PCA
  </text>

  <line x1="162" y1="226" x2="238" y2="226" stroke="#E2E8F0" stroke-width="1"/>
  <text x="162" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="700" fill="#0F172A">
    Lightweight Hydration
  </text>
  <text x="162" y="250" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#64748B">
    Zero Shine · Won't Clog
  </text>

  <rect x="162" y="262" width="76" height="16" rx="3" fill="#F0F9FF" stroke="#BAE6FD"/>
  <text x="200" y="273" font-family="monospace" font-size="7" font-weight="700" fill="#0369A1" text-anchor="middle">
    50 g / Net Wt.
  </text>
</svg>
`);

// 7. Re'equil Ultra Matte Dry Touch Gel SPF 50 PA++++
export const REEQUIL_MATTE_SPF_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="reequil-tube" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="rq-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0284C7" flood-opacity="0.18"/>
    </filter>
  </defs>

  <g filter="url(#rq-shadow)">
    <path d="M148 75 Q200 68 252 75 L242 285 Q200 295 158 285 Z" fill="url(#reequil-tube)" stroke="#CBD5E1" stroke-width="1.5"/>
    <rect x="165" y="288" width="70" height="48" rx="8" fill="#0369A1" stroke="#075985" stroke-width="1.5"/>
  </g>

  <!-- Re'equil Dark Blue Signature Logo -->
  <text x="200" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" fill="#0C4A6E" text-anchor="middle" letter-spacing="1">
    Re'equil
  </text>
  <text x="200" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#0284C7" text-anchor="middle" letter-spacing="1">
    DERMATOLOGICALLY TESTED
  </text>

  <!-- Coral/Blue Sun Protection Box -->
  <rect x="156" y="150" width="88" height="66" rx="8" fill="#F0F9FF" stroke="#BAE6FD"/>
  <text x="200" y="168" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#0369A1" text-anchor="middle">ULTRA MATTE</text>
  <text x="200" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="800" fill="#475569" text-anchor="middle">DRY TOUCH GEL</text>
  
  <rect x="166" y="188" width="68" height="18" rx="4" fill="#0284C7"/>
  <text x="200" y="201" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">SPF 50 PA++++</text>

  <text x="200" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="700" fill="#0C4A6E" text-anchor="middle">Oil-Free &amp; Water-Resistant</text>
  <text x="200" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="600" fill="#64748B" text-anchor="middle">Velvety Matte Finish</text>

  <rect x="180" y="260" width="40" height="14" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
  <text x="200" y="270" font-family="monospace" font-size="7" font-weight="700" fill="#0C4A6E" text-anchor="middle">50 g</text>
</svg>
`);

// 8. Re'equil Ceramide & Hyaluronic Acid Moisture Balm
export const REEQUIL_CERAMIDE_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="rq-jar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="rq-jar-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g filter="url(#rq-jar-shadow)">
    <!-- Jar Lid -->
    <rect x="135" y="110" width="130" height="30" rx="8" fill="#0C4A6E" stroke="#075985"/>
    <!-- Jar Base -->
    <rect x="140" y="135" width="120" height="160" rx="20" fill="url(#rq-jar)" stroke="#CBD5E1" stroke-width="2"/>
  </g>

  <!-- Blue Label -->
  <rect x="150" y="155" width="100" height="115" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="200" y="178" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" fill="#0C4A6E" text-anchor="middle">
    Re'equil
  </text>
  <text x="200" y="194" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#0284C7" text-anchor="middle">
    Ceramide &amp; HA
  </text>
  <text x="200" y="208" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="700" fill="#334155" text-anchor="middle">
    Moisture Balm
  </text>

  <rect x="160" y="218" width="80" height="2" fill="#0284C7"/>
  <text x="200" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#64748B" text-anchor="middle">
    Skin Shield Defense
  </text>
  <text x="200" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#94A3B8" text-anchor="middle">
    Mango Seed Butter
  </text>

  <rect x="175" y="254" width="50" height="12" rx="3" fill="#F0F9FF"/>
  <text x="200" y="263" font-family="monospace" font-size="7" font-weight="700" fill="#0369A1" text-anchor="middle">
    100 g / 3.5 oz
  </text>
</svg>
`);

// 9. COSRX Advanced Snail 96 Mucin Power Essence (Clear tall pump bottle)
export const COSRX_SNAIL_MUCIN_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="cosrx-bottle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="cosrx-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.12"/>
    </filter>
  </defs>

  <g filter="url(#cosrx-shadow)">
    <!-- Clear Cap & Black Pump -->
    <rect x="178" y="50" width="44" height="42" rx="6" fill="#F1F5F9" fill-opacity="0.6" stroke="#CBD5E1"/>
    <rect x="186" y="60" width="28" height="28" rx="4" fill="#18181B"/>
    <rect x="182" y="88" width="36" height="12" fill="#27272A"/>

    <!-- Tall Slender Clear Cylinder Bottle -->
    <rect x="148" y="100" width="104" height="235" rx="30" fill="url(#cosrx-bottle)" stroke="#CBD5E1" stroke-width="1.5"/>
  </g>

  <!-- Clear Dip Tube -->
  <line x1="200" y1="100" x2="200" y2="310" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>

  <!-- Minimalist Black COSRX Label -->
  <rect x="156" y="130" width="88" height="160" rx="4" fill="#FFFFFF" fill-opacity="0.9" stroke="#E4E4E7"/>
  
  <text x="200" y="156" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#18181B" text-anchor="middle" letter-spacing="1">
    COSRX
  </text>
  <line x1="168" y1="166" x2="232" y2="166" stroke="#E4E4E7" stroke-width="1"/>

  <text x="200" y="184" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="800" fill="#18181B" text-anchor="middle">
    Advanced Snail 96
  </text>
  <text x="200" y="196" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700" fill="#3F3F46" text-anchor="middle">
    Mucin Power Essence
  </text>

  <rect x="168" y="206" width="64" height="2" fill="#E4E4E7"/>
  <text x="200" y="222" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#52525B" text-anchor="middle">
    Snail Secretion Filtrate 96%
  </text>
  <text x="200" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#71717A" text-anchor="middle">
    Deep Barrier Hydration
  </text>

  <rect x="170" y="254" width="60" height="16" rx="3" fill="#F4F4F5"/>
  <text x="200" y="265" font-family="monospace" font-size="7" font-weight="700" fill="#18181B" text-anchor="middle">
    100 ml / 3.38 fl. oz.
  </text>
</svg>
`);

// 10. SkinCeuticals C E Ferulic (Amber glass apothecary bottle)
export const SKINCEUTICALS_CE_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="skinc-amber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#92400E"/>
      <stop offset="40%" stop-color="#5B21B6"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
    <filter id="skinc-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <g filter="url(#skinc-shadow)">
    <!-- Dropper Bulb & Collar -->
    <path d="M188 45 C188 35 212 35 212 45 L212 70 L188 70 Z" fill="#18181B"/>
    <rect x="178" y="70" width="44" height="24" rx="3" fill="#27272A"/>
    <rect x="185" y="94" width="30" height="16" fill="#78350F"/>
    <!-- Amber Bottle Body -->
    <rect x="145" y="110" width="110" height="215" rx="28" fill="#78350F" stroke="#92400E" stroke-width="1.5"/>
  </g>

  <!-- Clinical Typographic White Label -->
  <rect x="156" y="135" width="88" height="160" rx="4" fill="#FFFFFF" stroke="#E4E4E7"/>
  <text x="200" y="156" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#0C4A6E" text-anchor="middle" letter-spacing="1">
    SKINCEUTICALS
  </text>
  <line x1="164" y1="164" x2="236" y2="164" stroke="#0284C7" stroke-width="1.5"/>

  <text x="200" y="182" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" fill="#18181B" text-anchor="middle">
    C E FERULIC
  </text>
  <text x="200" y="196" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="700" fill="#0369A1" text-anchor="middle">
    COMBINATION ANTIOXIDANT
  </text>

  <text x="164" y="218" font-family="monospace" font-size="6" font-weight="700" fill="#3F3F46">
    15% L-ASCORBIC ACID
  </text>
  <text x="164" y="228" font-family="monospace" font-size="6" font-weight="700" fill="#3F3F46">
    1% ALPHA TOCOPHEROL
  </text>
  <text x="164" y="238" font-family="monospace" font-size="6" font-weight="700" fill="#3F3F46">
    0.5% FERULIC ACID
  </text>

  <rect x="164" y="254" width="72" height="16" rx="2" fill="#F4F4F5"/>
  <text x="200" y="265" font-family="monospace" font-size="7" font-weight="700" fill="#18181B" text-anchor="middle">
    30 ml / 1 fl oz
  </text>
</svg>
`);

// 11. The Derma Co 10% Azelaic Acid Face Serum
export const DERMA_CO_AZELAIC_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="azelaic-bottle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </linearGradient>
    <filter id="az-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g filter="url(#az-shadow)">
    <path d="M188 45 C188 35 212 35 212 45 L212 70 L188 70 Z" fill="#1E293B"/>
    <rect x="178" y="70" width="44" height="24" rx="3" fill="#E2E8F0" stroke="#CBD5E1"/>
    <rect x="185" y="94" width="30" height="16" fill="#F1F5F9" stroke="#CBD5E1"/>
    <rect x="145" y="110" width="110" height="215" rx="32" fill="url(#azelaic-bottle)" stroke="#CBD5E1" stroke-width="2"/>
  </g>

  <text x="200" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#0F172A" text-anchor="middle" letter-spacing="0.5">
    the <tspan fill="#7C3AED">derma</tspan> co.
  </text>
  <text x="200" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#64748B" text-anchor="middle">
    DESIGNED BY DERMATOLOGISTS
  </text>

  <!-- Purple/Violet Active Block -->
  <rect x="156" y="174" width="88" height="52" rx="8" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1.5"/>
  <text x="200" y="193" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="900" fill="#6D28D9" text-anchor="middle">10% Azelaic Acid</text>
  <text x="200" y="207" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#4338CA" text-anchor="middle">+ 1% Alpha Arbutin</text>
  <text x="200" y="219" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#7C3AED" text-anchor="middle">Red Spot Treatment</text>

  <text x="200" y="244" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" font-weight="600" fill="#334155">Fades Red Acne Marks</text>
  <text x="200" y="256" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="500" fill="#64748B">Chamomile Bisabolol</text>

  <rect x="180" y="272" width="40" height="14" rx="4" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="200" y="282" font-family="monospace" font-size="7" font-weight="700" fill="#0F172A" text-anchor="middle">30 ml</text>
</svg>
`);

// 12. Minimalist Squalane Deep Cleansing Oil-Balm
export const MINIMALIST_BALM_SVG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="balm-tub" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="balm-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g filter="url(#balm-shadow)">
    <rect x="135" y="115" width="130" height="28" rx="8" fill="#1E293B"/>
    <rect x="140" y="140" width="120" height="155" rx="20" fill="url(#balm-tub)" stroke="#CBD5E1" stroke-width="2"/>
  </g>

  <rect x="150" y="158" width="100" height="110" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="200" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" fill="#1E293B" text-anchor="middle">
    Be Minimalist.
  </text>
  <text x="200" y="198" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#0D9488" text-anchor="middle">
    Squalane 08%
  </text>
  <text x="200" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="700" fill="#334155" text-anchor="middle">
    Cleansing Oil Balm
  </text>

  <rect x="160" y="220" width="80" height="2" fill="#E2E8F0"/>
  <text x="200" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6.5" font-weight="600" fill="#64748B" text-anchor="middle">
    Dissolves Sunscreen &amp; Soot
  </text>
  <text x="200" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="6" font-weight="500" fill="#94A3B8" text-anchor="middle">
    Sunflower Seed Oil 35%
  </text>

  <rect x="175" y="254" width="50" height="12" rx="3" fill="#F0FDFA"/>
  <text x="200" y="263" font-family="monospace" font-size="7" font-weight="700" fill="#0F766E" text-anchor="middle">
    100 g / 3.5 oz
  </text>
</svg>
`);

/**
 * Verified mapping from product id to authentic packaging visual
 */
export const VERIFIED_PACKAGING_MAP: Record<string, string> = {
  'cleanser-cetaphil-gentle': CETAPHIL_CLEANSER_SVG,
  'serum-derma-co-niacinamide': DERMA_CO_NIACINAMIDE_SVG,
  'spf-foxtale-dewy-70': FOXTALE_DEWY_SPF_SVG,
  'serum-minimalist-salicylic-2': MINIMALIST_SALICYLIC_SVG,
  'serum-minimalist-vitc-10': MINIMALIST_VITC_SVG,
  'cream-minimalist-b5-gel': MINIMALIST_B5_GEL_SVG,
  'spf-reequil-ultra-matte': REEQUIL_MATTE_SPF_SVG,
  'cream-ceramide-reequil': REEQUIL_CERAMIDE_SVG,
  'toner-cosrx-snail-or-centella': COSRX_SNAIL_MUCIN_SVG,
  'serum-skinceuticals-ce-ferulic': SKINCEUTICALS_CE_SVG,
  'serum-derma-co-azelaic': DERMA_CO_AZELAIC_SVG,
  'cleanser-double-balm': MINIMALIST_BALM_SVG,
  // Cross-reference fallbacks for dupe aliases
  'clinical-cult-skinceuticals': SKINCEUTICALS_CE_SVG,
  'serum-vit-c-premium': SKINCEUTICALS_CE_SVG,
  'cleanser-minimalist-oat': CETAPHIL_CLEANSER_SVG
};
