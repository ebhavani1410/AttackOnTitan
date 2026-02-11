import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
import re
import time

st.set_page_config(page_title="AI Physics Visualizer", layout="wide")

st.title("🧠 AI Powered Physics Word Problem Visualizer")

# ------------------------------
# NLP PARSER
# ------------------------------

def parse_problem(text):
    text = text.lower()

    velocity = 10
    angle = 90
    gravity = 9.8

    # Extract velocity
    vel_match = re.search(r'(\d+)\s*m/s', text)
    if vel_match:
        velocity = float(vel_match.group(1))

    # Extract angle
    angle_match = re.search(r'(\d+)\s*degree', text)
    if angle_match:
        angle = float(angle_match.group(1))

    # Detect type
    if "straight up" in text or "thrown up" in text:
        motion_type = "vertical"
    elif "projectile" in text or "angle" in text:
        motion_type = "projectile"
    elif "drop" in text or "free fall" in text:
        motion_type = "freefall"
    else:
        motion_type = "vertical"

    return {
        "type": motion_type,
        "velocity": velocity,
        "angle": angle,
        "gravity": gravity
    }

# ------------------------------
# SIMULATION FUNCTIONS
# ------------------------------

def simulate_vertical(v0, g):
    t = np.linspace(0, 2*v0/g, 200)
    y = v0*t - 0.5*g*t**2
    return t, y

def simulate_projectile(v0, angle, g):
    theta = np.radians(angle)
    t_flight = 2*v0*np.sin(theta)/g
    t = np.linspace(0, t_flight, 200)

    x = v0*np.cos(theta)*t
    y = v0*np.sin(theta)*t - 0.5*g*t**2

    return x, y

def simulate_freefall(g):
    t = np.linspace(0, 5, 200)
    y = 50 - 0.5*g*t**2
    y[y < 0] = 0
    return t, y

# ------------------------------
# USER INPUT
# ------------------------------

problem_text = st.text_area(
    "Enter Physics Word Problem:",
    "A ball is thrown straight up with a speed of 10 m/s."
)

if st.button("Generate Simulation"):

    parsed = parse_problem(problem_text)

    st.subheader("🔍 Extracted Parameters")
    st.json(parsed)

    # Sliders for real-time manipulation
    v0 = st.slider("Initial Velocity (m/s)", 1, 50, int(parsed["velocity"]))
    g = st.slider("Gravity (m/s²)", 1, 20, int(parsed["gravity"]))

    if parsed["type"] == "projectile":
        angle = st.slider("Angle (degrees)", 10, 80, int(parsed["angle"]))

    st.subheader("🎬 Simulation")

    fig, ax = plt.subplots()

    if parsed["type"] == "vertical":
        t, y = simulate_vertical(v0, g)
        ax.set_xlim(0, 5)
        ax.set_ylim(0, max(y)+5)
        line, = ax.plot([], [], 'bo')

        for i in range(len(t)):
            line.set_data(0, y[i])
            st.pyplot(fig)
            time.sleep(0.01)
            ax.clear()
            ax.set_xlim(0, 5)
            ax.set_ylim(0, max(y)+5)

    elif parsed["type"] == "projectile":
        x, y = simulate_projectile(v0, angle, g)
        ax.set_xlim(0, max(x)+5)
        ax.set_ylim(0, max(y)+5)
        line, = ax.plot([], [], 'ro')

        for i in range(len(x)):
            line.set_data(x[i], y[i])
            st.pyplot(fig)
            time.sleep(0.01)
            ax.clear()
            ax.set_xlim(0, max(x)+5)
            ax.set_ylim(0, max(y)+5)

    elif parsed["type"] == "freefall":
        t, y = simulate_freefall(g)
        ax.set_xlim(0, 5)
        ax.set_ylim(0, 60)
        line, = ax.plot([], [], 'go')

        for i in range(len(t)):
            line.set_data(0, y[i])
            st.pyplot(fig)
            time.sleep(0.01)
            ax.clear()
            ax.set_xlim(0, 5)
            ax.set_ylim(0, 60)

    st.success("Simulation Complete!")