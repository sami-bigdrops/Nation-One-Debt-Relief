# Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables
Create `.env.local` with production values:
```bash
# ========================================
# LeadProsper API Configuration
# ========================================
LEADPROSPER_CAMPAIGN_ID=26298
LEADPROSPER_SUPPLIER_ID=75288
LEADPROSPER_API_KEY=xvveflq5kcjwok
LEADPROSPER_API_URL=https://api.leadprosper.io/direct_post

# ========================================
# TrustedForm Configuration
# ========================================
NEXT_PUBLIC_TRUSTEDFORM_FIELD=xxTrustedFormCertUrl
NEXT_PUBLIC_TRUSTEDFORM_PROVIDE_REFERRER=false
NEXT_PUBLIC_TRUSTEDFORM_SANDBOX=false

# ========================================
# Application Configuration
# ========================================
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secure-secret-key-here

# ========================================
# Performance & Monitoring (Optional)
# ========================================
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GTM_ID=your-google-tag-manager-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
```

### 2. Environment Variable Management
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your production values
nano .env.local

# Verify environment variables are loaded
npm run dev  # Check console for any missing variables
```

**⚠️ Critical**: If you see "Server configuration error" when submitting the form, it means your environment variables are not properly set. Check that all required variables are in your `.env.local` file.

### 3. Build Optimization
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### 3. Performance Optimizations Applied
- ✅ Security headers configured
- ✅ Image optimization enabled
- ✅ Console logs removed for production
- ✅ Error boundaries implemented
- ✅ Loading states improved
- ✅ Form validation enhanced
- ✅ UTM parameter system optimized
- ✅ Scroll behavior controlled

### 4. Environment Variable Validation
Your application now uses environment variables for:
- ✅ **LeadProsper API** - Campaign ID, Supplier ID, API Key, URL
- ✅ **TrustedForm** - Field names, referrer policy, sandbox mode
- ✅ **Application** - Environment, authentication, URLs
- ✅ **Monitoring** - Analytics, error tracking, performance

### 5. Security Features
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restricted
- Powered-by header removed

### 5. Monitoring & Analytics
- Error boundary for crash reporting
- Form submission monitoring
- UTM parameter tracking
- Performance metrics (optional)

## 🔧 Production Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Production start
npm start

# Lint check
npm run lint

# Bundle analysis (optional)
ANALYZE=true npm run build
```

## 📊 Performance Metrics

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🚨 Critical Notes

1. **API Keys**: Never commit real API keys to version control
2. **Environment**: Use `.env.local` for production secrets
3. **Monitoring**: Set up error tracking for production
4. **Backup**: Regular database and file backups
5. **SSL**: Ensure HTTPS is enabled in production

## 🎯 Post-Deployment

1. **Environment Variables Test**
   - Verify LeadProsper API connection
   - Check TrustedForm integration
   - Confirm UTM parameter tracking

2. **Functionality Testing**
   - Test form submission with real data
   - Verify UTM parameter tracking
   - Check error handling and validation

3. **Performance & Security**
   - Monitor performance metrics
   - Verify security headers
   - Test on multiple devices/browsers

4. **Monitoring Setup**
   - Configure error tracking
   - Set up analytics
   - Monitor API response times
