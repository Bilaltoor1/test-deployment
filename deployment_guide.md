# Next.js Deployment Guide for Ubuntu with Nginx and PM2

This guide will walk you through deploying your Next.js application on an Ubuntu server (or WSL environment) using PM2 to manage the application process and Nginx as a reverse proxy.

## Step 1: Build Your Next.js Application

First, you need to create a production build of your application. This command compiles your code and optimizes it for production.

```bash
npm run build
```

This will create a `.next` directory in your project folder. This directory contains the production-ready version of your application.

## Step 2: Prepare Your Server Environment (WSL/Ubuntu)

You'll be running these commands inside your WSL/Ubuntu terminal.

### 2.1. Access Your Project Files

If you are using WSL, your Windows files are accessible under the `/mnt/` directory. You can navigate to your project directory like this:

```bash
# Replace 'c' with the appropriate drive letter and update the path to your project
cd /mnt/c/Users/bilaltoor/Desktop/test-deployment
```

### 2.2. Install Node.js and npm

If you don't have Node.js installed on your Ubuntu system, install it now:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

### 2.3. Install Production Dependencies

Navigate to your project directory (if you're not already there) and install only the production dependencies from your `package.json` file.

```bash
npm install --production
```

## Step 3: Install and Use PM2 to Run Your App

PM2 is a process manager for Node.js applications that will keep your site running in the background.

### 3.1. Install PM2 Globally

```bash
sudo npm install pm2 -g
```

### 3.2. Start Your Next.js Application with PM2

From within your project directory, use PM2 to start your Next.js application. The `npm start` command will run the production server.

```bash
pm2 start npm --name "test-deployment" -- start
```

Your app is now running, managed by PM2. By default, it will be on `http://localhost:3000`.

### 3.3. (Optional) Check Application Status

You can check the status of your application managed by PM2 with:

```bash
pm2 status
```

### 3.4. Enable Startup on Boot (Fix for 502 Error on Reboot)

To ensure your application restarts automatically after a reboot, you need to create a PM2 startup script. This is the solution to the 502 Bad Gateway error after a system restart.

First, start your application if it's not already running. **You must run these commands inside your WSL/Ubuntu terminal.**

```bash
# Navigate to your project directory inside WSL
cd /mnt/c/Users/bilaltoor/Desktop/test-deployment

# Start or restart the app
pm2 restart test-deployment
```

Now, save the current process list and create the startup script:

```bash
pm2 save

pm2 startup
```

PM2 will output a command that you need to copy and run. It will look something like this:
`sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u your_username --hp /home/your_username`

**Important:** Sometimes this command can fail in WSL due to issues with spaces in the Windows `PATH`. If you see an error like `No such file or directory`, run the following simplified command instead. This version uses the direct path to the PM2 executable and is more reliable in WSL.

```bash
sudo /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u bilaltoor --hp /home/bilaltoor
```

Run this command. It will configure your system to automatically start your application on boot, preventing the 502 error in the future.

## Step 4: Set Up Nginx as a Reverse Proxy

Nginx will sit in front of your Next.js application. It will receive requests from the internet and forward them to your application running on port 3000.

### 4.1. Install Nginx

```bash
sudo apt install -y nginx
```

### 4.2. Create an Nginx Configuration File

Create a new configuration file for your site in the `sites-available` directory.

```bash
sudo nano /etc/nginx/sites-available/nextjs-app
```

### 4.3. Add the Nginx Configuration

Paste the following configuration into the file you just opened. This tells Nginx to listen for requests on port 80 and forward them to your Next.js app running on port 3000.

```nginx
server {
    listen 80;
    server_name your_server_ip_or_domain; # Replace with your server's IP or domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save the file and exit the editor (in `nano`, press `Ctrl+X`, then `Y`, then `Enter`).

### 4.4. Enable the Nginx Configuration

Create a symbolic link from your new configuration file in `sites-available` to the `sites-enabled` directory.

```bash
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
```

### 4.5. Test and Restart Nginx

Test your Nginx configuration to make sure there are no syntax errors:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

## Step 5: Access Your Deployed Site

Your Next.js application should now be accessible from your browser. If you are running this on WSL, you can typically access it via `http://localhost` from your Windows browser. If it's on a remote server, use the server's IP address or domain name.
