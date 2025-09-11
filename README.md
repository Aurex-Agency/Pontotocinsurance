# Pontotoc Insurance Agency - Insurance Website

A modern, responsive insurance website built with Next.js, TypeScript, and Tailwind CSS for Pontotoc Insurance Agency in Pontotoc, Mississippi.

## Features

- **Modern Design**: Clean, professional design with smooth animations and responsive layout
- **Service Pages**: Dedicated pages for Home, Auto, Life, Health, and Retirement Planning insurance
- **Contact Forms**: Interactive quote forms and contact forms with validation
- **Responsive**: Fully responsive design that works on all devices
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Services Covered

1. **Home Insurance** - Comprehensive property protection
2. **Auto Insurance** - Vehicle coverage with multiple carrier options
3. **Life Insurance** - Term and permanent life insurance solutions
4. **Health Insurance** - Individual, family, and Medicare plans
5. **Retirement Planning** - 401(k), IRA, and investment strategies

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── home/              # Home insurance page
│   ├── auto/              # Auto insurance page
│   ├── life/              # Life insurance page
│   ├── health/            # Health insurance page
│   ├── retirement/        # Retirement planning page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── services/          # Service-specific components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ...               # Other components
└── public/               # Static assets
```

## Key Components

- **Header**: Responsive navigation with mobile menu
- **Footer**: Contact information and site links
- **HeroSection**: Homepage hero with quote form
- **ServicesOverview**: Service cards with detailed information
- **WhyChooseUs**: Company benefits and testimonials
- **Testimonials**: Client reviews and success stories
- **ContactCTA**: Call-to-action section with contact form

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Blue tones for main branding
- Secondary: Gray tones for text and backgrounds

### Content
All text content is easily editable in the component files. Key areas to customize:
- Company information in Header and Footer
- Service descriptions in CoverageOptions component
- Testimonials in Testimonials component

### Contact Information
Update contact details in:
- Header component (phone, email, address)
- Footer component (full contact info)
- Contact page components

## Deployment

The site is ready for deployment on Vercel:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with default settings

## Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Static Generation**: Pre-rendered pages for better performance
- **Responsive Images**: Optimized images for different screen sizes

## SEO Features

- **Meta Tags**: Proper title, description, and keywords
- **Structured Data**: JSON-LD for business information
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Performance**: Optimized loading times and Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary to The Agency Next Door. All rights reserved.

## Support

For technical support or questions about this website, contact:
- Email: info@pontotocinsuranceagency.com
- Phone: (662) 200-2249
- Address: 158 MS-15, Suite D, Pontotoc, MS 38863
