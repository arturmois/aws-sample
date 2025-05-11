# AWS Sample Application Deployment Guide

This guide provides instructions for deploying the backend and frontend applications to an AWS EC2 instance.

## Prerequisites

1. AWS Account with EC2 access
2. AWS CLI installed and configured
3. SSH access to your EC2 instance
4. Node.js and npm installed on your EC2 instance
5. Git installed on your EC2 instance

## EC2 Instance Setup

1. Launch an EC2 instance:
   - Choose Amazon Linux 2 or Ubuntu Server
   - t2.micro or larger instance type
   - Configure security groups to allow:
     - SSH (Port 22)
     - HTTP (Port 80)
     - HTTPS (Port 443)
     - Backend API port (default: 3000)
     - Frontend port (default: 3001)

2. Connect to your EC2 instance:
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

3. Install required software:
```bash
# Update system
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16  # or your preferred Node.js version

# Install Git
sudo yum install git -y  # For Amazon Linux
# OR
sudo apt install git -y  # For Ubuntu
```

## Application Deployment

1. Clone the repository:
```bash
git clone https://github.com/arturmois/aws-sample.git
cd aws-sample
```

2. Backend Deployment:
```bash
cd backend
npm install
# Create a production environment file if needed
# Start the backend server
npm start
```

3. Frontend Deployment:
```bash
cd ../frontend
npm install
# Create a production environment file if needed
# Build the frontend
npm run build
# Start the frontend server
npm start
```

## Running as a Service

To keep your applications running after closing the SSH session, use PM2:

1. Install PM2:
```bash
npm install -g pm2
```

2. Start the backend:
```bash
cd backend
pm2 start server.js --name "backend"
```

3. Start the frontend:
```bash
cd frontend
pm2 start server.js --name "frontend"
```

4. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

## Environment Configuration

1. Backend (.env):
```
PORT=3000
NODE_ENV=production
```

2. Frontend (.env):
```
REACT_APP_API_URL=http://your-ec2-ip:3000
PORT=3001
```

## Monitoring and Maintenance

1. Check application status:
```bash
pm2 status
```

2. View logs:
```bash
pm2 logs backend
pm2 logs frontend
```

3. Restart applications:
```bash
pm2 restart all
```

## Security Considerations

1. Set up HTTPS using Let's Encrypt
2. Configure AWS Security Groups properly
3. Keep Node.js and npm packages updated
4. Use environment variables for sensitive data
5. Implement proper CORS settings

## Troubleshooting

1. Check application logs:
```bash
pm2 logs
```

2. Check system logs:
```bash
sudo tail -f /var/log/syslog  # Ubuntu
# OR
sudo tail -f /var/log/messages  # Amazon Linux
```

3. Check if ports are in use:
```bash
sudo netstat -tulpn | grep LISTEN
```

## Backup and Recovery

1. Regular backups of your application code
2. Database backups if applicable
3. Environment configuration backups
4. PM2 process list backup:
```bash
pm2 save
```

## Additional Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Node.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
