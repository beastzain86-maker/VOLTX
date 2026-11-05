# VOLTX GEAR — Hostinger Deployment Guide

This guide walks through deploying the **VOLTX GEAR** e-commerce web application onto **Hostinger Shared/Cloud Hosting** or a **Hostinger VPS**.

---

## Architecture Overview
- **Framework**: React 19 + TypeScript + Vite 8 + Tailwind CSS v4
- **State Management**: Full persistent browser storage (`localStorage`) for cart, wishlist, orders, user accounts, and catalog modifications.
- **Routing**: Client-side SPA routing with `.htaccess` fallback for Hostinger Apache/LiteSpeed web servers.

---

## Method 1: Hostinger Shared / Cloud Web Hosting (Recommended)

Hostinger's LiteSpeed-powered Shared and Cloud plans offer high speeds for static Vite React single-page apps.

### Step 1: Build the production bundle
On your local machine or CI/CD environment, run:
```bash
npm install
npm run build
```
This generates the optimized production bundle inside the `/dist` directory. The `/public/.htaccess` file is automatically copied to `/dist/.htaccess`.

### Step 2: Upload to Hostinger public_html
1. Log into your **Hostinger hPanel**.
2. Go to **Websites** → select your domain → open **File Manager**.
3. Navigate to the `public_html/` folder.
4. Upload all files and folders from inside your local `/dist` directory directly into `public_html/`:
   - `assets/` (CSS & JavaScript chunks)
   - `index.html`
   - `.htaccess`
5. Ensure the `.htaccess` file exists in `public_html/`. It contains the rewrite rule:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Step 3: Enable SSL in hPanel
1. In hPanel, go to **Security** → **SSL**.
2. Activate your free Lifetime SSL certificate.
3. Turn on **Force HTTPS**.

Your store is now live with global CDN caching and SSL encryption.

---

## Method 2: Hostinger VPS (Ubuntu / Nginx / Node.js)

For full root control or running a custom Express backend:

### Step 1: Connect to your Hostinger VPS
```bash
ssh root@your_vps_ip
```

### Step 2: Clone repository & build
```bash
cd /var/www
git clone <your-repo-url> voltx-gear
cd voltx-gear
npm install
npm run build
```

### Step 3: Configure Nginx
Create or edit `/etc/nginx/sites-available/voltx`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/voltx-gear/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```
Enable site and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/voltx /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 4: Install Let's Encrypt SSL
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Store Accounts & Default Demo Data
- **Demo Customer**: `alex.vance@techgear.io` (pre-loaded order history & tracking)
- **Store Administrator**: `admin@voltxgear.com` (full product catalog CRUD, coupon manager, order status updates)
- **Active Promotional Coupons**:
  - `VOLTX20`: 20% off site-wide on orders $50+
  - `WELCOME10`: 10% off first order
  - `FREESHIP`: Complimentary Express Shipping
