# Frontend Design Standards

## Visual Design Principles
- Use a consistent color palette: define primary, secondary, accent colors as CSS variables
- Maintain a clear visual hierarchy: headings > subheadings > body text
- Ensure sufficient contrast ratios (WCAG AA: 4.5:1 for text, 3:1 for large text)
- Use whitespace generously — avoid cramming content together
- Keep consistent spacing using a base unit (e.g., 8px grid system)

## Typography
- Use no more than 2-3 font families
- Set a readable base font size (16px minimum for body text)
- Use relative units (rem/em) for font sizes, not px
- Line height: 1.5-1.7 for body text, 1.2-1.3 for headings
- Limit line length to 60-80 characters for readability

## Layout & Spacing
- Use CSS Grid or Flexbox for layout, not floats or tables
- Apply consistent padding/margin using multiples of 4px or 8px
- Sections should have clear visual separation (spacing, borders, or background color changes)

## Color & Style
- Define all colors as CSS custom properties (--primary, --secondary, --accent, --bg, --text)
- Use subtle gradients or shadows to add depth — avoid flat, lifeless designs
- Hover/focus states: add transitions (0.2-0.3s ease) for interactive elements
- Buttons: clear visual weight, adequate padding (12px 24px minimum), rounded corners

## Responsive Design
- Mobile-first approach: design for mobile, enhance for desktop
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop)
- Touch targets: minimum 44x44px on mobile
- Navigation: hamburger menu on mobile, horizontal on desktop

## Animation & Interaction
- Use CSS transitions for hover effects (transform, opacity, box-shadow)
- Respect prefers-reduced-motion media query
