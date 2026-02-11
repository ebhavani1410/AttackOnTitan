# AI Powered Physics Word Problem Visualizer

This project is a Streamlit web application that uses Natural Language Processing (NLP) to parse physics word problems and generate interactive simulations.

---

## Features

-   **Natural Language Processing:** Uses spaCy to extract parameters like velocity, angle, and height from a text description.
-   **Interactive Simulations:** Visualizes projectile motion using Plotly, allowing for real-time adjustments.
-   **User-Friendly Interface:** Built with Streamlit for a simple and intuitive web interface.

---

## Technical Stack

-   **Frontend:** Streamlit
-   **NLP:** spaCy
-   **Visualization:** Plotly
-   **Core Logic:** Python, NumPy, Pandas

---

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

---

## How to Run

Once the setup is complete, you can run the Streamlit application with the following command:

```bash
streamlit run run.py
```

This will start the web server and open the application in your default web browser.

---

## Project Structure

```
.
├── .venv/
├── README.md
├── requirements.txt
└── run.py
```

---

## Future Scope

-   Graph plotting (Position–Time, Velocity–Time)
-   Additional motion types (e.g., circular motion, collisions)
-   Enhanced visualization with 3D models
-   Integration with a Large Language Model (LLM) for more advanced problem understanding and explanation.