# C1SE.24 SkinAid Capstone 1

# SkinAid - Skin Wound Detection & Classification Support System

> **SkinAid** is an AI-powered system that helps identify and classify skin injuries (scratches, bruises, burns). The project goes beyond simple identification; it also provides medically approved first aid guidance and locates the nearest medical facility to minimize the risk of complications for users.

---

## ✨ Key Features

1.  AI-powered wound identification: Analyzes images to determine wound type and severity.

2.  Standard first aid guidance: Provides corresponding first aid steps based on WHO and Ministry of Health documents.

3.  Medical facility location: Integrates Google Maps API to find the nearest hospital/clinic.

4.  History tracking: Allows users to store and review wound progress.

5.  System administration: Admin dashboard for managing users, medical data, and system logs.

## 🌟 Outstanding Technology

The project utilizes the most advanced technologies currently available:

| Ingredients  | Technology                                                                                                                                       | Description                                                                                |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Backend**  | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)                                                                  | Logic processing, high-performance API, asynchronous.                                      |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite) | Modern interface, smooth experience with TypeScript.                                       |
| **AI Core**  | ![YOLOv11](https://img.shields.io/badge/Model-YOLOv11-blue) ![EfficientNetB0](https://img.shields.io/badge/Model-EfficientNetB0-orange)          | **YOLOv11**: Locate the wound.`<br>`**EfficientNetB0**: Classification of severity levels. |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql)                                                         | Secure and reliable data storage.                                                          |
| **Deploy**   | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker)                                                                     | Easy to package and deploy.                                                                |

---

## 📂 System Structure

```mermaid
graph TD
    User["User"] -->|"Upload Image"| FE["Frontend (React)"]
    FE -->|"API Request"| BE["Backend (FastAPI)"]
    BE -->|"Save/Retrieve Data"| DB[("PostgreSQL")]
    BE -->|"Send Image for Analysis"| AI["AI Service (YOLOv11 + EfficientNetB0)"]
    AI -->|"Diagnostic Results"| BE
    BE -->|"First Aid Guide"| FE
```

---

## 🚀 Installation and Launch Guide

### 1. Manual Run (For Developers)

If you need to debug or develop individual modules.

#### 🔧 General Setup

Make sure you have installed: **Python 3.10+**, **Node.js 18+**, **PostgreSQL**.

##### 🗄️ SkinAid Database Setup Guide

The setup includes creating a new database and importing the table structure (schema) and initial data (if any) from an SQL file.

###### Step 1: Create a New Database

Before importing, you need to create an empty database named skinaid_db in PostgreSQL. You can use the command-line interface (psql) or a management tool like pgAdmin.

Using SQL Commands: CREATE DATABASE skinaid_db;

###### Step 2: Import the SQL file into the database

Assuming your SQL file is named skinaid_schema.sql (The skinaid_schema.sql file is located in "docs" folder), choose methods:

Using pgAdmin 4 (Graphical Interface)

- Right-click on the newly created skinaid_db database.

- Select Restore... or open the Query Tool.

- If using the Query Tool, click the open file button (folder icon), select the .sql file, and click the Execute button (F5).

#### Setting up the environment (.env)

1.  Open the project directory tree in VS Code.

2.  Right-click the ai-ml folder -> Select New File -> Enter the name .env -> Paste the prepared source code from the env_ai_ml.txt file into the ai_ml ".env" file.

3.  Right-click the backend folder -> Select New File -> Enter the name .env -> Paste the prepared source code from the env_backend.txt file into the ".env" file of the backend.

#### 🧠 A. Launch the AI ​​Service (Important)

_This module needs to run independently or be integrated into Docker Compose if it's not already present._

1. Access the directory: `cd ai_ml`
2. Create a venv and install the library:

   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   ```

3. Run the service:

   ```bash
   python run.py
   ```

   _The service will run at: http://localhost:8001_

#### 🔙 B. Launch the Backend

1. Access the directory: `cd backend`
2. Configure the database in `.env` (point to your local Postgres directory).
   Example:
   DATABASE_URL=postgresql+asyncpg://[user]:[password]@localhost:5432/skinaid_db

3. Install and run:

   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt

   # Start server
   uvicorn app.main:app --reload --port 8000
   ```

#### 🎨 C. Launch Frontend

1. Access the folder: `cd frontend`
2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   _The app will run at: http://localhost:5173 (Vite's default settings)_

---

## 📦 Code Directory Details

To help you quickly understand the system without reading the sub-REAME:

- **`ai_ml/`**: Contains image processing logic.
- `main.py` / `run.py`: Service entry points.
- `models/`: Where model weight files are stored (`.pt`, `.h5`, `.onnx`).
- `pipeline/`: Processing steps from Preprocessing -> Detection (YOLOv11) -> Classification (EfficientNetB0).

- **`backend/`**: Data orchestration center.
- `app/api/`: Defines endpoints.
- `app/services/`: Business logic (AI calls, user processing, calculations).
- `app/models/`: Database table structure (SQLAlchemy).

- **`frontend/`**: User interface.
- `src/components/`: Reusable interface components.
- `src/pages/`: Home screens (Home, Upload, Results).
