# Style Guide for GoldForex Pulse (Web3 Design Agency Theme)

### 1. Color Palette
- **Primary Background**: #0A0A0A (rich black)
- **Secondary Background**: #1A1A1A (dark charcoal)
- **Accent Gradient**: linear-gradient(135deg, #FF4791 0%, #FF73C0 100%)
- **Highlight**: #FEC75A (golden pop)
- **Text Primary**: #FFFFFF (white)
- **Text Secondary**: #B0B0B0 (light gray)
- **Button Background**: #FFFFFF (white)
- **Button Text**: #000000 (black)

### 2. Typography
- **Font Family**: `Inter, sans-serif`
- **Display / Heading**: 48px, 600 weight, tight letter spacing
- **Sub-Heading**: 32px, 500 weight
- **Body Text**: 16px, 400 weight, line-height 1.6
- **Navigation / Labels**: 14px, 500 weight, uppercase spacing

### 3. Spacing & Layout
- **Base Unit**: 8px
- **Section Padding**: 64px top & bottom
- **Container Width**: max 1200px
- **Gap between cards**: 24px

### 4. Border & Radius
- **Border Radius**: 8px for cards and buttons
- **Border**: 1px solid rgba(255,255,255,0.1) for panels

### 5. Shadows & Effects
- **Card Shadow**: 0 4px 12px rgba(0,0,0,0.5)
- **Button Hover**: box-shadow 0 0 8px rgba(255,71,145,0.5)
- **Backdrop Blur**: `backdrop-filter: blur(12px)` on glass panels

### 6. Component Tokens (tailwind.config.ts)
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#1A1A1A',
        'accent-start': '#FF4791',
        'accent-end': '#FF73C0',
        'highlight': '#FEC75A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        md: '12px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.5)',
      },
    },
  },
};