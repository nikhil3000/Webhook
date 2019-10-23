# Webhook
Github webhook to keep local repo (on aws ec2 instance) in sync with remote


I am using this webhook in my aws instance to pull changes from my github repository as soon as some new changes are push to it and .i don't have to ssh into my server to pull the changes. Maybe there are better efficient ways to do this but this was my first try at webhooks.

So first you need to create a webhook for your project on github. There are various guides to do so (use url: <aws-public-ip>:8080/payload) The one important that needs to taken care of is the url of webhook service. Creating the post service in the same project i want to pull didn't work for me (probably the script wasn't executing completely, because i restart the server at the end of my script). To solve this problem I am running two servers in my instance, one on port 5000 which is my main project for which i am making a webhook and another on port 8080 which is running my webhook code (this repo). Now the server running on port 5000 is behind a ngnix server, so it listens to port 80 which is open to the internet if http is added to the security  group of ec2 instance. But for port 8080 a custom rule needs to be added in the inbound security group. Now just clone this repo, start the server and check if port 8080 is exposed by hitting <aws-public-ip>:8080/get. 

### Changes in code

* Create some random secret, (try `openssl rand -base64 15`) and set it to `webhookSecret` in index.js and github webhook creation section, it will prevent some adversary from triggering any pull 

* When the payload route is hit with correct secret (only github can do that), it will execute the deploy.sh script. My deploy.sh was placed in ~/ so change your path accordingly. 

* You also need to make your deploy.sh executable by running `chmod +x deploy.sh`

* In deploy.sh, enter the correct path of your project directory

* I have used yarn and pm2 in my deploy.sh, change them if you are using someting else. 

