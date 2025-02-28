Open the terminal
# In the terminal run the commands:
1. npm init -y
2. npm install express nodemon jsonwebtoke
3. node server.js

# In Postman
1. In post give endpoint "http://localhost:5000/login".
2. Give the raw json body:{
    "username":"admin",
    "password":"admin123"
}
3. Token is generated.
4. In the get route give endpoint "http://localhost:5000/profile"
5. In headers give Key as authorization and value as Bearer token_generated
6. While sending recieves a message:Welcome to your profile.
7. In the get route give endpoint "http://localhost:5000/admin-dashboard"
8. While sending will recieve a message:Welcome to admin dashboard