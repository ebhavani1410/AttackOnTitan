# 🧠 PhysiVerse

**AI-Enhanced Interactive Physics Learning Platform**

PhysiVerse is an intelligent physics education platform that combines natural language processing with real-time interactive simulations. Students can describe physics problems in plain English, and the system automatically extracts parameters, updates visualizations, and demonstrates the underlying physics principles through dynamic animations.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://www.python.org/)

---

## 🎯 Key Features

- **🧠 Natural Language Processing**: Regex-based parameter extraction from plain English physics problems
- **🎨 Real-Time Simulations**: Interactive HTML5 Canvas animations for each physics concept
- **📚 Topic-Specific Parsing**: Intelligent context-aware parsers tailored to each physics domain
- **🎛️ Dynamic Controls**: Automatic slider and input updates based on extracted parameters
- **📊 Live Calculations**: Real-time physics computations with visual feedback
- **🧩 Modular Architecture**: Scalable component-based design for easy expansion
- **🤖 AI Physics Engine**: Backend integration with spaCy for advanced NLP capabilities

---

## 📚 Physics Modules

Each module features natural language input processing and interactive visualization:

| Module | Capabilities | Example Input |
|--------|-------------|---------------|
| **Newton's Laws** | Mass, force, time → acceleration & displacement | "A 5 kg block is pushed with 40 N for 6 seconds" |
| **Vertical Motion** | Initial velocity, gravity → max height & flight time | "A ball is thrown upward at 20 m/s" |
| **Projectile Motion** | Velocity, angle → 2D trajectory simulation | "Launch at 30 m/s at 45 degrees" |
| **Circular Motion** | Radius, velocity, mass → centripetal force | "A 2 kg object moves in a 5 m radius circle at 10 m/s" |
| **Collisions** | Masses, velocities → post-collision analysis | "5 kg at 10 m/s hits 3 kg at rest" |
| **Friction** | Mass, force, coefficient → net force & motion | "10 kg block with 50 N force, friction 0.3" |
| **Pendulum** | Length, angle → period & oscillation | "A 2 meter pendulum at 30 degrees" |

---

## 🏗️ Project Structure

```
physiverse/
├── backend/                    # Python backend services
│   ├── app.py                 # Main Flask/FastAPI application
│   ├── laws_streamlit.py      # Streamlit physics demonstrations
│   └── venv/                  # Python virtual environment
├── src/
│   ├── components/            # Reusable React components
│   │   ├── AIPhysicsEngine.jsx    # AI-powered physics solver
│   │   ├── ProjectileSim.jsx      # Projectile simulation component
│   │   └── VerticalSim.jsx        # Vertical motion component
│   ├── pages/                 # Route-based page components
│   │   ├── Home.jsx
│   │   ├── LawsOfMotion.jsx
│   │   ├── ProjectileMotion.jsx
│   │   ├── VerticalMotion.jsx
│   │   ├── CircularMotion.jsx
│   │   ├── Collision.jsx
│   │   ├── Friction.jsx
│   │   ├── Pendulum.jsx
│   │   ├── Lesson.jsx
│   │   └── Topic.jsx
│   ├── utils/
│   │   └── physicsParser.js   # NLP parsing utilities
│   ├── App.jsx                # Main application component
│   └── main.jsx               # Application entry point
└── public/                    # Static assets
```

---

## 💻 Tech Stack

### Frontend
- **React 19.2** - Modern UI library with React Compiler enabled
- **Vite 7.3** - Lightning-fast build tool and dev server
- **React Router 7.13** - Client-side routing
- **Axios** - HTTP client for API communication
- **HTML5 Canvas** - High-performance graphics rendering

### Backend
- **Python 3.8+** - Backend runtime
- **spaCy 3.8** - Advanced NLP processing
- **Flask/Streamlit** - Web framework and interactive demos
- **NumPy** - Numerical computations
- **Plotly** - Data visualization

### Development Tools
- **ESLint** - Code quality and consistency
- **Babel React Compiler** - Optimized React transformations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ebhavani1410/AttackOnTitan.git
   cd AttackOnTitan
   ```

2. **Install frontend dependencies**
   ```bash
   cd physiverse
   npm install
   ```

3. **Set up Python backend**
   ```bash
   # Create virtual environment
   python -m venv .venv
   
   # Activate virtual environment
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Download spaCy language model
   python -m spacy download en_core_web_sm
   ```

### Running the Application

**Frontend Development Server:**
```bash
cd physiverse
npm run dev
```
Access at: `http://localhost:5173`

**Backend Server:**
```bash
# Activate virtual environment first
cd physiverse/backend
python app.py
```

**Streamlit Demo:**
```bash
cd physiverse/backend
streamlit run laws_streamlit.py
```

### Build for Production

```bash
cd physiverse
npm run build
npm run preview
```

---

## 🧠 How It Works

```
User Input (Natural Language)
           ↓
    NLP Parser (Regex/spaCy)
           ↓
   Parameter Extraction
           ↓
   React State Management
           ↓
  Physics Engine Computation
           ↓
   Canvas Animation Rendering
           ↓
    Real-Time Visualization
```

Each physics module includes:
1. **Context-aware parser** - Extracts relevant parameters for the specific physics domain
2. **Validation layer** - Ensures extracted values are physically meaningful
3. **Computation engine** - Applies physics formulas and laws
4. **Animation controller** - Manages frame-by-frame rendering
5. **Interactive controls** - Allows manual parameter adjustment

---

## 📖 Usage Example

**Input:**
```
"A 5 kg block is pushed with 40 N for 6 seconds"
```

**System Processing:**
1. Extracts: `mass = 5 kg`, `force = 40 N`, `time = 6 s`
2. Computes: `acceleration = F/m = 8 m/s²`
3. Calculates: `displacement = ½at² = 144 m`
4. Animates: Block motion with force vectors
5. Updates: All sliders and display values

---

## 🎨 Features in Detail

### Natural Language Processing
- Regex-based pattern matching for physics quantities
- Unit recognition and conversion
- Context-aware parameter extraction
- Support for various input formats

### Interactive Simulations
- Smooth 60 FPS canvas animations
- Pause/play/reset controls
- Adjustable simulation speed
- Vector visualization (force, velocity, acceleration)

### Educational Tools
- Step-by-step problem breakdown
- Formula display with substituted values
- Real-time graph plotting
- Concept explanations and lessons

---

## 🔮 Roadmap

- [ ] Unified NLP utility across all modules
- [ ] Machine learning-based parameter extraction
- [ ] Voice-to-text input support
- [ ] Advanced graph plotting (v-t, a-t, s-t diagrams)
- [ ] Multi-language support
- [ ] Mobile-responsive design improvements
- [ ] User accounts and progress tracking
- [ ] Problem-solving hints and tutorials
- [ ] Export simulation results
- [ ] 3D physics simulations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🌐 Links

- **GitHub Repository**: [AttackOnTitan](https://github.com/ebhavani1410/AttackOnTitan)
- **Live Demo**: Coming soon

---

## 👥 Authors

Created with ❤️ by the PhysiVerse team

---

## 🙏 Acknowledgments

- React and Vite communities for excellent tooling
- spaCy for powerful NLP capabilities
- Physics educators for domain expertise
- Open source contributors

---

**PhysiVerse** - Transforming physics education through AI-assisted interactive learning
