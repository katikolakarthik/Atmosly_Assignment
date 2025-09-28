# 🚀 Deployment Guide

This guide covers deploying the SpaceX Mission Explorer to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Project built and tested locally

## 🌐 Vercel Deployment (Recommended)

### Option 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd atmosly
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name: `spacex-mission-explorer`
   - Directory: `./`
   - Override settings? `N`

5. **Production deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Vercel Configuration

The project includes `vercel.json` with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🌐 Netlify Deployment

### Option 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Option 2: Netlify Dashboard

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

2. **Environment variables:** None required

## 🌐 GitHub Pages

### Using GitHub Actions

1. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
       
       - name: Install dependencies
         run: npm ci
       
       - name: Build
         run: npm run build
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

## 🔧 Build Optimization

### Pre-deployment Checklist

1. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check bundle size:**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

3. **Verify all features work:**
   - Search functionality
   - Filtering
   - Favorites
   - Modal details
   - Responsive design

### Environment Variables

No environment variables required for this project.

### Build Configuration

The project uses Vite with optimized settings:

- **Output directory:** `dist/`
- **Base path:** `/` (root)
- **Asset handling:** Automatic optimization
- **Code splitting:** Automatic

## 🚨 Troubleshooting

### Common Issues

1. **Build fails:**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Styles not loading:**
   - Verify Tailwind CSS configuration
   - Check PostCSS setup

3. **API errors:**
   - Verify SpaceX API is accessible
   - Check CORS settings

### Performance Optimization

1. **Bundle analysis:**
   ```bash
   npm run build
   # Analyze dist/ folder
   ```

2. **Lighthouse audit:**
   - Use browser dev tools
   - Check performance metrics

## 📊 Monitoring

### Post-deployment

1. **Test all features:**
   - Search and filtering
   - Favorites persistence
   - Modal functionality
   - Mobile responsiveness

2. **Performance check:**
   - Page load speed
   - API response times
   - Bundle size

3. **Error monitoring:**
   - Check browser console
   - Monitor API calls
   - Test error states

## 🔄 Updates

### Updating deployment

1. **Make changes locally**
2. **Test thoroughly**
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```
4. **Automatic deployment** (if configured)

---

**Ready for deployment! 🚀**
