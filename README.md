🧠 PhySim AI
AI-Enhanced Physics Simulation Platform
🚀 Overview

PhySim AI is an interactive physics learning platform that integrates rule-based Natural Language Processing (NLP) with real-time simulations.

Users can enter physics word problems in plain English, and the system automatically:

Extracts physical parameters

Updates simulation controls

Computes derived values

Generates dynamic visualizations

The project bridges the gap between theory and visualization using AI-assisted parameter extraction.

🎯 Key Features

🧠 NLP-based parameter extraction (regex-based parsing)

📚 Topic-wise intelligent parsing

🎛 Automatic slider updates from text input

🎨 Real-time Canvas animations

📊 Dynamic physics calculations

🧩 Modular architecture using React

📚 Supported Physics Modules

Each module includes natural language parsing + interactive simulation:

Newton’s Laws of Motion
Extracts mass, force, time → computes acceleration & displacement

Vertical Motion
Extracts initial velocity, gravity → computes max height & time of flight

Projectile Motion
Extracts velocity, angle → simulates 2D trajectory

Uniform Circular Motion
Extracts radius, velocity, mass → computes centripetal force & acceleration

Collision (Elastic)
Extracts masses & initial velocities → calculates post-collision velocities

Friction
Extracts mass, applied force, coefficient → computes net force & motion

Simple Pendulum
Extracts length, gravity, angle → computes time period & oscillation

🧠 How It Works
User Word Problem
        ↓
Rule-Based NLP Parser
        ↓
Parameter Extraction
        ↓
React State Update
        ↓
Physics Computation
        ↓
Canvas Animation


Each topic includes a contextual parser tailored to its physics domain.

💻 Tech Stack

React.js

JavaScript (ES6+)

HTML5 Canvas API

React Router

Regex-based NLP

⚙️ Example Input
A 5 kg block is pushed with 40 N for 6 seconds


System automatically:

Extracts mass = 5

Extracts force = 40

Extracts time = 6

Computes acceleration

Animates motion

🧩 Architecture

Modular topic-based components

Independent simulation engines

Dedicated NLP parser per module

Scalable design for future expansion

🔮 Future Enhancements

Unified shared NLP utility

AI confidence scoring

Graph plotting (velocity-time, displacement-time)

Voice-to-text input

ML-based NLP integration

🚀 Run Locally
npm install
npm run dev


Open in browser:

http://localhost:5173

🏆 Summary

PhySim AI transforms traditional physics problem-solving into an AI-assisted interactive experience by combining natural language understanding with real-time simulation modeling.