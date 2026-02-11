
import streamlit as st
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

st.set_page_config(page_title="AI Physics Visualizer", layout="wide")

st.title("🧠 AI Powered Physics Word Problem Visualizer")

# ------------------------------
# NLP PARSER with spaCy
# ------------------------------

def parse_problem(text):
    text = text.lower()
    doc = nlp(text)

    # Default values
    params = {
        "velocity": 10,
        "angle": 45,
        "height": 0,
        "gravity": 9.8,
        "motion_type": "projectile" # Default to projectile
    }

    # Keywords to identify parameters
    velocity_keywords = ["velocity", "speed", "m/s", "thrown", "launched"]
    angle_keywords = ["angle", "degree", "degrees"]
    height_keywords = ["height", "from", "above"]

    # Extract numbers and their context
    for token in doc:
        if token.pos_ == "NUM":
            num_value = float(token.text)
            # Check the surrounding words for context
            for subtoken in token.head.children:
                if subtoken.lemma_ in velocity_keywords:
                    params["velocity"] = num_value
                elif subtoken.lemma_ in angle_keywords:
                    params["angle"] = num_value
                elif subtoken.lemma_ in height_keywords:
                    params["height"] = num_value

    # Detect motion type
    if any(keyword in text for keyword in ["straight up", "thrown up", "vertically"]):
        params["motion_type"] = "vertical"
        params["angle"] = 90
    elif any(keyword in text for keyword in ["projectile", "angle", "launched at"]):
        params["motion_type"] = "projectile"
    elif any(keyword in text for keyword in ["drop", "free fall", "fall from"]):
        params["motion_type"] = "freefall"
        params["velocity"] = 0

    return params

# ------------------------------
# SIMULATION FUNCTIONS
# ------------------------------

def simulate_projectile(v0, angle, h0, g, t_steps=200):
    theta = np.radians(angle)
    
    # Time of flight calculation needs to account for initial height
    # Simplified for hackathon: assume flight until it hits y=0
    t_flight = (v0 * np.sin(theta) + np.sqrt((v0 * np.sin(theta))**2 + 2 * g * h0)) / g
    t = np.linspace(0, t_flight, t_steps)

    x = v0 * np.cos(theta) * t
    y = h0 + v0 * np.sin(theta) * t - 0.5 * g * t**2
    
    # Ensure simulation stops when it hits the ground
    y[y < 0] = 0
    
    df = pd.DataFrame({"t": t, "x": x, "y": y})
    return df

# ------------------------------
# USER INPUT
# ------------------------------

problem_text = st.text_area(
    "Enter Physics Word Problem:",
    "A ball is launched at 20 m/s at an angle of 30 degrees from a height of 10 meters."
)

if st.button("Generate Simulation"):

    params = parse_problem(problem_text)

    st.subheader("🔍 Extracted Parameters")
    st.json(params)

    # Sliders for real-time manipulation
    v0 = st.slider("Initial Velocity (m/s)", 1, 100, int(params["velocity"]))
    g = st.slider("Gravity (m/s²)", 1, 20, int(params["gravity"]))
    angle = st.slider("Angle (degrees)", 0, 90, int(params["angle"]))
    h0 = st.slider("Initial Height (m)", 0, 100, int(params["height"]))
    
    st.subheader("🎬 Simulation")

    # Run simulation
    sim_df = simulate_projectile(v0, angle, h0, g)

    # Create animated plot with Plotly
    fig = go.Figure(
        data=[go.Scatter(x=sim_df.x, y=sim_df.y,
                         mode="lines",
                         line=dict(width=2, color="blue"),
                         name="Trajectory"),
              go.Scatter(x=[sim_df.x.iloc[0]], y=[sim_df.y.iloc[0]],
                         mode="markers",
                         marker=dict(color="red", size=10),
                         name="Object")],
        layout=go.Layout(
            xaxis=dict(range=[0, sim_df.x.max() * 1.1], autorange=False),
            yaxis=dict(range=[0, sim_df.y.max() * 1.1], autorange=False),
            title="Projectile Motion",
            updatemenus=[dict(
                type="buttons",
                buttons=[dict(label="Play",
                              method="animate",
                              args=[None, {"frame": {"duration": 30, "redraw": False},
                                           "fromcurrent": True, "transition": {"duration": 0}}])
                         ])]
        ),
        frames=[go.Frame(data=[go.Scatter(x=[x], y=[y],
                                          mode="markers",
                                          marker=dict(color="red", size=10))])
                for x, y in zip(sim_df.x, sim_df.y)]
    )
    
    st.plotly_chart(fig, use_container_width=True)
    st.success("Simulation Complete!")
