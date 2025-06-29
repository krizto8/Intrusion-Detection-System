# 🚨 Intrusion Detection System (IDS) with Machine Learning

An end-to-end Intrusion Detection System that leverages machine learning models to classify and detect anomalous network traffic. The system is trained on the CICIDS 2018 dataset and supports real-time traffic analysis, a React.js dashboard for visualization, and Python-based prediction services connected via a Node.js backend.

---

## 📁 Project Overview

This IDS project is capable of monitoring live network traffic or analyzing pre-collected packet captures, extracting relevant features, and predicting potential intrusions using a trained Random Forest model.

Key capabilities:

- Real-time packet capture and processing
- High-accuracy ML-based classification
- Role-based user authentication
- Graphical analysis using charts and diagrams
- Flask-powered ML microservice
- Secure JWT authentication

---

## 🎯 Goals

- Detect known and unknown cyber attacks from real network traffic
- Provide insights and dashboards for users
- Enable model retraining with new data
- Allow admin to upload new datasets
- Maintain modular and scalable architecture

---

## 🧠 Architecture

```plaintext
              ┌────────────┐
              │  React.js  │  ←── Dashboard UI (Chart.js, Plotly.js)
              └────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │  Node.js API  │  ←── Express Server (Routing + Auth)
           └──────┬────────┘
                  │
                  ▼
        ┌────────────────────┐
        │  Python ML Server  │  ←── Flask (model prediction APIs)
        └────────────────────┘
                  │
                  ▼
         CICIDS 2018 Dataset  ←── Preprocessed and used for training
