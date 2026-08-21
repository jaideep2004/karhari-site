# Deploying Karhari Media to a Hostinger VPS

Stack: Next.js 16 (server build) → Node 20+ → PM2 → Nginx (reverse proxy + Let's Encrypt SSL).

Requirements checked:
- Next 16.3.0 needs Node **>= 20.9** (use 20 LTS or 22 LTS)
- `images.unoptimized: true` — no sharp/image-processing daemon needed
- Contact form (`/api/contact`) sends email via Gmail SMTP (Nodemailer) — needs outbound TCP 465 (allowed on Hostinger VPS)
- No hardcoded localhost/port references in the app — safe to run behind a proxy on any port

---

## 1. Provision the VPS

In hPanel: VPS → Ubuntu 22.04 or 24.04, **Nginx** template (or plain Ubuntu and install Nginx in step 2).

Point your domain's A record at the VPS IP (`@` and `www`) in DNS before running certbot (step 6).

## 2. Install Node, Nginx, PM2, Git

SSH into the VPS as root:

```bash
apt update && apt upgrade -y
apt install -y nginx git curl

# Node 22 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# build tools (only needed if a package compiles native code)
apt install -y build-essential

npm install -g pm2
node -v   # expect v22.x
```

## 3. Deploy the app

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/jaideep2004/karhari-site.git karharimedia
cd karharimedia
npm ci
```

## 4. Environment variables (contact form SMTP)

Create `/var/www/karharimedia/.env`:

```
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
CONTACT_TO=support@karharimedia.com
```

Notes:
- `SMTP_PASS` must be a **Gmail App Password** (Google Account → Security → 2-Step Verification → App passwords), not your normal password.
- `.env` is gitignored, so it survives `git pull` — keep a copy in your password manager.
- Optional: `SMTP_HOST`/`SMTP_PORT` can point at any SMTP provider (e.g., Hostinger email) — the code defaults to Gmail 465.

## 5. Build and start with PM2

```bash
npm run build                 # must print "Compiled successfully" + 15 static routes
pm2 start ecosystem.config.js
pm2 save
pm2 startup                   # run the printed command to enable boot-start
```

Verify it serves locally before touching Nginx:

```bash
curl -I http://127.0.0.1:3000          # expect 200
curl -s http://127.0.0.1:3000/api/contact -X POST -H "Content-Type: application/json" -d '{"subject":"Deploy Test","body":"Deployment smoke test.","replyTo":"test@example.com","fromName":"Deploy Test","website":""}' | head -c 300
```

(The contact POST should return `{"ok":true}` — an SMTP error means check the Gmail app password.)

## 6. Nginx + SSL

```bash
# copy the template and set your domain
cp deploy/nginx.conf /etc/nginx/sites-available/karharimedia
nano /etc/nginx/sites-available/karharimedia   # replace YOUR_DOMAIN.com
ln -s /etc/nginx/sites-available/karharimedia /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# SSL (free Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

## 7. Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

Port 3000 stays closed to the public — only Nginx talks to it on localhost.

## 8. Updating the site later

```bash
cd /var/www/karharimedia
git pull
npm ci
npm run build
pm2 reload karharimedia
```

## 9. Useful commands

```bash
pm2 status                 # process state
pm2 logs karharimedia      # app logs (contact form errors appear here)
systemctl status nginx
tail -f /var/log/nginx/error.log
```

## Troubleshooting

| Problem | Fix |
|---|---|
| 502 Bad Gateway | `pm2 status` — app crashed. `pm2 logs karharimedia` for the error; usually a failed build or missing `.env`. |
| Contact form fails, log shows SMTP auth error | Wrong app password, or Gmail has "Less secure apps" / 2FA config issue. Re-generate the App Password. |
| Site loads but styles broken | `npm run build` wasn't re-run after a pull, or Nginx missing the `/_next/static/` block. |
| 404 on new pages after update | Re-run `npm run build` + `pm2 reload` (routes are prerendered at build time). |
