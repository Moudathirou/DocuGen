# DocuGen - Code Documentation Generator

DocuGen is a web application that automatically generates documentation for your code using OpenAI's capabilities. Built with Express.js, this project demonstrates the implementation of authentication, API integration, and modern web development practices.

[![DocuGen Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

## Features

- 📝 Automatic code documentation generation using OpenAI
- 🔐 User authentication system using SQLite
- 💻 Modern UI with Tailwind CSS
- ⚡ Built with Express.js
- 📱 Responsive design

## Technologies Used

- Backend:
  - Express.js
  - SQLite
  - Node.js
  
- Frontend:
  - HTML5
  - Tailwind CSS
  
- APIs:
  - OpenAI API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Moudathirou/DocuGen.git

Install dependencies:
```bash
cd DocuGen
npm install
Create a .env file in the root directory and add your configuration:

Copier
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_secret_key
Initialize the database:
bash

Copier
node create-admin.js
Start the server:
bash

Copier
npm start
Usage
Register or login to your account
Upload or paste your code
Click "Generate Documentation"
View and export your generated documentation
Project Structure
dsconfig

Copier
DocuGen/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── models/         # Database models
├── public/         # Static files
├── routes/         # Route handlers
├── server.js       # Main application file
└── create-admin.js # Admin user creation script
Authentication
The application uses SQLite for user authentication. Features include:

User registration
Login system
Session management
Password encryption
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Learning Outcomes
This project was built to learn:

Express.js implementation
Authentication systems
API integration
Database management with SQLite
Frontend development with Tailwind CSS
Contact
Your Name - @your_twitter

Project Link: https://github.com/Moudathirou/DocuGen

sql_more

Copier

Note: You'll need to replace the following placeholders:
- `YOUR_VIDEO_ID` with your actual YouTube video ID
- Your social media links
- Your OpenAI API key
- Your contact information

Would you like me to explain
