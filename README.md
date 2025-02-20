# Lexi (Women's Health Chatbot) 

A responsive and accessible chatbot application designed to provide women with reliable health information and resources. Built with React, Vite, and Python Flask, featuring a modern UI with Tailwind CSS.

## Features

- Real-time chat interface with natural language processing
- Women's health information and resources
- Responsive design for mobile and desktop
- Emoji support for enhanced communication
- Accessible following WCAG guidelines
- Secure data handling and user privacy protection

## Live Link

[Live Link](https://lexi-chatbot.vercel.app/)

## Tech Stack

### Frontend
- React 19
- Vite 6
- Tailwind CSS 4
- React Router DOM 7
- Lucide React for icons
- AOS for animations

### Backend
- Python 3.9+
- Flask
- SQLAlchemy
- Flask-RESTful
- Flask-CORS

## Prerequisites

Before installation, ensure you have the following installed:
- Node.js (v18 or higher)
- Python (3.9 or higher)
- pip (Python package manager)
- Git

## Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone git@github.com:smigthereason/Lexi-chatbot.git
cd lexi-chatbot/frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_API_URL=http://localhost:5000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```bash
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
```

## Running the Application

### Start the Frontend

```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Start the Backend

```bash
cd backend
flask run
```
The API will be available at `http://localhost:5000`

## Development

### Frontend Development Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend Development Commands
```bash
flask run --debug  # Run with debug mode
python whatsapp_diagnostic.py  #run to debug whatsapp parameters in env
python app.py          # Run 
```

## Project Structure

```
Lexi-chatbot/
├── backend/
│   ├── venv/
│   └── Scripts/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── assets/          # Static assets, images, icons
│       ├── components/      # Reusable React components
│       ├── pages/          # Page-level components
│       └── styles/         # Global styles and Tailwind configurations
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## Authors

[Victor Maina](https://github.com/smigthereason)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers at support@example.com.