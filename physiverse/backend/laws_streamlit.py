import streamlit as st
import numpy as np
import matplotlib.pyplot as plt

st.title("🚀 Newton's Laws of Motion Simulation")

st.markdown("### F = m × a")

mass = st.slider("Mass (kg)", 1.0, 50.0, 5.0)
force = st.slider("Force (N)", 1.0, 100.0, 20.0)
time = st.slider("Time (seconds)", 1.0, 10.0, 5.0)

acceleration = force / mass

st.write(f"Acceleration: {acceleration:.2f} m/s²")

t = np.linspace(0, time, 100)
displacement = 0.5 * acceleration * t**2

fig, ax = plt.subplots()
ax.plot(t, displacement)
ax.set_xlabel("Time (s)")
ax.set_ylabel("Displacement (m)")
ax.set_title("Displacement vs Time")

st.pyplot(fig)
