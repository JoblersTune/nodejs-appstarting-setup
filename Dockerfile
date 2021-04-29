# build your image up on another base image
# Enter name of image that either exists on your system or on docker hub
# You can also download and cache dockerhub images locally with docker run node
FROM node

# Sets working directory to /app instead of root. 
# This way code with . will be copied inside the app folder
# npm install will be run in the app folder (which is now the working directory)
WORKDIR /app

#Which files on our local machine should go into this image
# . ./  or . /app specifies two paths
# this first dot would tell Docker that all the folders, sub folders and files here in this project (in the same folder of the Dockerfile)
# should be copied into the image - . means same folder
# second specifies where they should be copied to inside the image
# In this instance ./ means the app folder since it was specified as the working directory or can set to absolute path /app
# specifying the absolute path makes it clearer to read
COPY . /app

# Install all dependencies - needs RUN command
# will be installed by default into the working directory (usually root) of your container.
# If code is in app folder want to run npm install there as well - check the WORKDIR has been set then. 
RUN npm install

# Exposes port 80 to the loacl machine
EXPOSE 80

# Only want to start a server if we start a container
# Command (CMD) executes when a container is executed
# requires an array of strings
# Use node command
# to run server.js
# 
CMD ["node", "server.js"]