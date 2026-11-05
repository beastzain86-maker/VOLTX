import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  Terminal,
  FileCode,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react';

export const HostingerDeployGuide: React.FC = () => {
  const { navigateTo } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression for lightning fast loading
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser cache headers for assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`;

  const nodeDeployScript = `# Step 1: Install production dependencies
npm install --production=false

# Step 2: Build the high-performance Vite production bundle
npm run build

# Step 3: For Hostinger Shared/Cloud Hosting:
# Upload the generated /dist folder contents to public_html/
# along with the provided .htaccess file.

# Step 4: For Hostinger VPS (Ubuntu/Debian) running PM2:
npm install -g pm2
pm2 start "npm run preview" --name voltx-store
pm2 save
pm2 startup`;

  const nginxConfig = `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/voltx-store/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}`;

  return (
    <div className="bg-[#101114] min-h-screen text-white py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229C32]/20 text-[#229C32] text-xs font-bold border border-[#229C32]/30">
            <Server className="w-4 h-4" />
            <span>Hostinger Production Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Deploying VOLTX GEAR to Hostinger
          </h1>

          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            This application is engineered as a modern, zero-config Vite React TypeScript SPA with full client persistence. Follow these verified deployment steps for Hostinger Web Hosting, Cloud Hosting, or VPS.
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to Storefront
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="bg-[#25272B] hover:bg-[#32353B] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
            >
              Open Admin Console
            </button>
          </div>
        </div>

        {/* Option A: Hostinger Shared / Cloud Web Hosting */}
        <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#229C32] text-white font-bold flex items-center justify-center text-sm">
              A
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                Hostinger Web / Cloud Hosting (Static Single-Page App)
              </h2>
              <p className="text-xs text-gray-400">
                Recommended for fast CDN-backed performance, zero server maintenance, and SSL.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-gray-300">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#101114] border border-[#25272B]">
              <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-sm">1. Build the production files</p>
                <p className="text-gray-400 mt-1">
                  Run <code className="text-[#229C32] bg-[#18191D] px-1.5 py-0.5 rounded font-mono">npm run build</code> in your terminal. This creates an optimized <code className="text-white">/dist</code> directory containing minified assets, index.html, and CSS.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#101114] border border-[#25272B]">
              <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-sm">2. Upload to public_html via File Manager</p>
                <p className="text-gray-400 mt-1">
                  Log in to your <strong>Hostinger hPanel</strong>, open <strong>File Manager</strong>, navigate to <code className="text-white">public_html/</code>, and upload all files from inside your <code className="text-white">/dist</code> folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#101114] border border-[#25272B]">
              <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-sm">3. Add .htaccess Rewrite Configuration</p>
                <p className="text-gray-400 mt-1">
                  Create a file named <code className="text-white font-mono">.htaccess</code> directly inside <code className="text-white">public_html/</code> with the snippet below so all sub-routes (/shop, /cart, /checkout) route to index.html without 404 errors:
                </p>
              </div>
            </div>
          </div>

          {/* .htaccess snippet */}
          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-[#141518] rounded-t-xl border-t border-x border-[#25272B] text-xs font-mono text-gray-400">
              <span>public_html/.htaccess</span>
              <button
                onClick={() => copyText('htaccess', htaccessCode)}
                className="flex items-center gap-1.5 text-xs text-[#229C32] hover:text-white cursor-pointer"
              >
                {copiedKey === 'htaccess' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'htaccess' ? 'Copied!' : 'Copy Config'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#0E0F12] rounded-b-xl border border-[#25272B] text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {htaccessCode}
            </pre>
          </div>
        </div>

        {/* Option B: Hostinger VPS / Node.js Server Deployment */}
        <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
              B
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                Hostinger VPS (Ubuntu / Nginx / Node.js)
              </h2>
              <p className="text-xs text-gray-400">
                For complete root control, automated Git deployments, or backend API proxies.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-[#141518] rounded-t-xl border-t border-x border-[#25272B] text-xs font-mono text-gray-400">
              <span>Bash Shell Commands</span>
              <button
                onClick={() => copyText('bash', nodeDeployScript)}
                className="flex items-center gap-1.5 text-xs text-[#229C32] hover:text-white cursor-pointer"
              >
                {copiedKey === 'bash' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'bash' ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#0E0F12] rounded-b-xl border border-[#25272B] text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {nodeDeployScript}
            </pre>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-[#141518] rounded-t-xl border-t border-x border-[#25272B] text-xs font-mono text-gray-400">
              <span>/etc/nginx/sites-available/default</span>
              <button
                onClick={() => copyText('nginx', nginxConfig)}
                className="flex items-center gap-1.5 text-xs text-[#229C32] hover:text-white cursor-pointer"
              >
                {copiedKey === 'nginx' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'nginx' ? 'Copied!' : 'Copy Nginx'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#0E0F12] rounded-b-xl border border-[#25272B] text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {nginxConfig}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
