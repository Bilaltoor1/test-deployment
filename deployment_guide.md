# Deployment Guide for Next.js App on WSL Ubuntu with Nginx and PM2

This guide will walk you through deploying your Next.js application on a WSL Ubuntu environment using Nginx as a reverse proxy and PM2 as a process manager.

## Prerequisites

Make sure you have the following installed on your WSL Ubuntu distribution:

*   **Node.js and npm:** You can install them using `nvm` (Node Version Manager) or directly from the official repository.
*   **MongoDB:** Install MongoDB and ensure it's running.
*   **Nginx:** Install Nginx using `sudo apt-get install nginx`.
*   **PM2:** Install PM2 globally using `sudo npm install pm2 -g`.
*   **Git:** Install Git using `sudo apt-get install git`.

## Clean Up Previous Deployments (Optional)

If you have a previous version of this site deployed, follow these steps to remove it before proceeding.

### Stop and Delete PM2 Process

```bash
pm2 stop next-app
pm2 delete next-app
```

### Disable Nginx Site

```bash
sudo rm /etc/nginx/sites-enabled/test-deployment
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

## 1. Clone the Repository

Open your WSL terminal and clone your repository:

```bash
git clone https://github.com/Bilaltoor1/test-deployment.git
cd test-deployment
```

## 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and add your MongoDB connection string:

```bash
echo "MONGODB_URI=mongodb://localhost:27017/test-deployment" > .env.local
```

## 4. Build the Application

Build your Next.js application for production:

```bash
npm run build
```

## 5. Run with PM2

Start your Next.js application with PM2. This will run the app in the background and restart it automatically if it crashes.

```bash
pm2 start npm --name "next-app" -- start
```

You can check the status of your application with `pm2 list`.

To ensure your application restarts automatically after a reboot, run the following commands:

```bash
pm2 startup
```

This will generate a command that you need to copy and paste into your terminal. After running the generated command, save the current process list:

```bash
pm2 save
```

## 6. Configure Nginx

Now, configure Nginx to act as a reverse proxy, forwarding requests to your Next.js application running on port 3000.

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/test-deployment
```

Paste the following configuration into the file. This configuration listens on port 80 and forwards all requests to `http://localhost:3000`.

```nginx
server {
    listen 80;
    server_name your_domain_or_ip; # Replace with your domain or localhost if running locally

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

**Note:** Replace `your_domain_or_ip` with your actual domain name or IP address. If you are running this on your local machine, you can use `localhost`.

## 7. Enable the Nginx Configuration

Create a symbolic link to enable the new configuration:

```bash
sudo ln -s /etc/nginx/sites-available/test-deployment /etc/nginx/sites-enabled/
```

Test the Nginx configuration for syntax errors:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

Your Next.js application should now be accessible through your server's IP address or domain name on port 80.
