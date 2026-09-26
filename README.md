# 🚦 Smart City Traffic Analytics Dashboard

A comprehensive **Big Data Analytics and Smart City project** that processes and analyzes urban traffic data to identify congestion patterns, cluster intersections, forecast future traffic scenarios, and analyze security risks in IoT-based traffic systems.

The project processes **204,000+ traffic records** across **100 intersections and 12 city zones** using PySpark, Machine Learning, and an interactive Flask dashboard.

---

## Project Overview

Modern cities generate large amounts of traffic data through IoT sensors, cameras, GPS devices, and other connected systems. Analyzing this data can help identify congestion patterns and support better traffic-management decisions.

This project builds an end-to-end analytics pipeline that:

* Processes large-scale traffic data using **Apache PySpark**
* Performs exploratory data analysis
* Aggregates traffic information using **MapReduce concepts**
* Applies **KMeans clustering** to classify traffic congestion
* Analyzes hourly and weekly traffic trends
* Identifies traffic hotspots
* Generates future traffic scenarios using **GPT-2**
* Performs **STRIDE-based security threat modeling**
* Presents the results through an interactive **Flask web dashboard**

---

## Objectives

The main objectives of the project are:

1. Process a large urban traffic dataset efficiently.
2. Analyze traffic volume and congestion patterns.
3. Aggregate traffic data at the intersection and zone levels.
4. Cluster intersections according to their congestion characteristics.
5. Identify peak traffic hours and high-congestion locations.
6. Generate future traffic scenarios based on historical patterns.
7. Analyze security threats affecting IoT traffic sensors.
8. Build an interactive dashboard for visualizing the complete analysis.

---

## System Architecture

```text
                    ┌──────────────────────┐
                    │   Traffic IoT Data   │
                    │    204,000+ Records  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Data Preprocessing │
                    │ Pandas / PySpark     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Big Data Processing│
                    │      PySpark         │
                    │  MapReduce Concepts  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │ Traffic      │ │ KMeans       │ │ Trend &      │
      │ Aggregation  │ │ Clustering   │ │ Hotspot      │
      │              │ │              │ │ Analysis     │
      └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                    ┌──────────────────────┐
                    │  Forecasting / AI    │
                    │      GPT-2           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ STRIDE Security      │
                    │ Threat Analysis      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Flask Dashboard    │
                    │ HTML/CSS/JavaScript  │
                    └──────────────────────┘
```

---

## Project Highlights

### 1. Big Data Processing

The project processes more than **204,000 traffic records** using Apache PySpark.

The processing pipeline performs:

* Data cleaning
* Missing-value handling
* Feature selection
* Traffic aggregation
* Grouping by intersection and zone
* Time-based analysis
* Statistical analysis

MapReduce concepts are demonstrated through distributed-style **Map and Reduce operations** using PySpark transformations and aggregations.

---

### 2. Traffic Aggregation

Traffic data is aggregated at different levels:

* Intersection
* Zone
* Hour
* Day
* Week

This helps identify:

* Total vehicles
* Average traffic volume
* Average speed
* Average congestion score
* Peak traffic periods
* High-congestion intersections

---

### 3. KMeans Traffic Clustering

The project uses **KMeans clustering** from Scikit-learn to group intersections according to their traffic characteristics.

The resulting clusters are interpreted as:

```text
Low Congestion
       ↓
Medium Congestion
       ↓
High Congestion
```

The clustering analysis helps identify intersections that exhibit similar traffic behavior.

---

### 4. Traffic Trend Analysis

Historical traffic patterns are analyzed based on:

* Hour of the day
* Day of the week
* Intersection
* City zone
* Vehicle volume
* Average speed
* Congestion score

This allows the project to identify recurring traffic patterns and peak congestion periods.

---

### 5. AI-Based Future Scenario Generation

The project integrates **GPT-2 through Hugging Face Transformers** to generate simulated future traffic scenarios.

The forecasting section presents scenario-based outputs such as:

* Potential congestion increases
* Possible traffic redistribution
* High-risk congestion locations
* Future traffic-management scenarios

> **Note:** GPT-2 is used for scenario generation rather than as a statistically validated numerical traffic forecasting model. The generated scenarios should therefore be interpreted as simulations based on the analyzed traffic context.

---

### 6. IoT Security Analysis

The project applies the **STRIDE threat-modeling framework** to the IoT traffic-sensor layer.

The analysis considers threats such as:

| STRIDE Category        | Example Threat                      |
| ---------------------- | ----------------------------------- |
| Spoofing               | Fake IoT sensor identity            |
| Tampering              | Modification of sensor data         |
| Repudiation            | Lack of traceability for actions    |
| Information Disclosure | Unauthorized access to traffic data |
| Denial of Service      | Sensor or service disruption        |
| Elevation of Privilege | Unauthorized administrative access  |

The project also proposes security controls for protecting the IoT data pipeline.

---

## Interactive Dashboard

The final version includes a Flask-based web dashboard with **7 major sections**.

### 1. Overview

Displays important project statistics such as:

* Total records processed
* Number of intersections
* Number of city zones
* Peak traffic hours
* Overall traffic statistics

### 2. MapReduce

Displays processed traffic aggregation results.

Features include:

* Per-intersection traffic totals
* Searchable data
* Sortable tables
* Aggregated traffic statistics

### 3. Clustering

Displays the KMeans clustering results.

Includes:

* Low congestion intersections
* Medium congestion intersections
* High congestion intersections
* Cluster distribution
* Traffic characteristics of each cluster

### 4. Trends

Provides visual analysis of:

* Hourly traffic volume
* Weekly traffic patterns
* Congestion trends
* Traffic hotspots
* Intersection-level traffic behavior

### 5. Forecast

Displays AI-generated traffic scenarios using GPT-2.

The section provides scenario cards describing possible future traffic conditions.

### 6. Security

Displays the STRIDE security analysis.

Includes:

* Identified threats
* Threat categories
* Potential impact
* Recommended security controls
* IoT security architecture

### 7. Hotspots

Displays the top predicted or identified congestion locations.

This section helps highlight intersections that require additional traffic-management attention.

---

## 🛠️ Tech Stack

### Big Data & Data Processing

* **Apache PySpark**
* **Pandas**
* **NumPy**

### Machine Learning & AI

* **Scikit-learn**
* **KMeans Clustering**
* **Hugging Face Transformers**
* **GPT-2**

### Backend

* **Python**
* **Flask**

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**

### Data Visualization

* **Matplotlib**
* **Seaborn**
* **JavaScript-based dashboard charts**

### Security

* **STRIDE Threat Modeling Framework**

---

## Project Structure

```text
smart-city-traffic-analytics/
│
├── README.md
├── .gitignore
│
├── versions/
    │
    ├── v1-prototype/
    │   ├── notebook/
    │   │   └── initial_eda.ipynb
    │   │
    │   └── data/
    │       └── README.md
    │
    ├── v2-improved/
    │   ├── notebook/
    │   │   └── pyspark_kmeans.ipynb
    │   │
    │   └── data/
    │       └── README.md
    │
    └── v3-final/
        │
        ├── notebook/
        │   └── final_analysis.ipynb
        │
        ├── dashboard/
        │   ├── app.py
        │   ├── data.json
        │   ├── requirements.txt
        │   │
        │   ├── templates/
        │   │   ├── index.html
        │   │   ├── mapreduce.html
        │   │   ├── clustering.html
        │   │   ├── trends.html
        │   │   ├── forecast.html
        │   │   ├── security.html
        │   │   └── hotspots.html
        │   │
        │   └── static/
        │       ├── css/
        │       ├── js/
        │       └── charts/
        │
        └── screenshots/```


## Dataset

### Dataset Source

**CityFlow Smart Urban Mobility and Traffic IoT**

Kaggle Dataset:

https://www.kaggle.com/datasets/mobeenfatimah/cityflow-smart-urban-mobility-and-traffic-iot

### Dataset Information

| Property      | Value               |
| ------------- | ------------------- |
| Records       | 204,000             |
| Intersections | 100                 |
| City Zones    | 12                  |
| Features      | 47                  |
| Data Type     | Urban Traffic / IoT |
| Processing    | PySpark             |

The dataset contains traffic and IoT-related attributes such as:

* Vehicle count
* Vehicle speed
* Congestion score
* Weather conditions
* Intersection information
* Zone information
* Time-related attributes
* IoT sensor health
* Other traffic-related parameters

---

## Project Evolution

The project was developed incrementally through three major versions.

### Version 1.0 — Prototype

The initial version focused on understanding the dataset and performing basic exploratory data analysis.

Implemented:

* Dataset loading
* Data inspection
* Basic preprocessing
* Exploratory data analysis
* Initial traffic visualizations

---

### Version 2.0 — Big Data & Machine Learning

The second version introduced the core Big Data and Machine Learning components.

Implemented:

* Apache PySpark
* Large-scale data processing
* MapReduce concepts
* Traffic aggregation
* KMeans clustering
* Congestion classification
* Advanced visualizations

---

### Version 3.0 — Final System

The final version combines analytics, AI, security, and visualization into a complete system.

Implemented:

* Complete PySpark processing pipeline
* KMeans traffic clustering
* Traffic trend analysis
* Hotspot identification
* GPT-2 scenario generation
* STRIDE security analysis
* Flask backend
* Interactive web dashboard
* Searchable and sortable tables

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sitikanthsahoo/smart-city-traffic-analytics.git
```

```bash
cd smart-city-traffic-analytics
```

---

### 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install Dependencies

Navigate to the final dashboard:

```bash
cd versions/v3-final/dashboard
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

---

### 4. Run the Flask Dashboard

```bash
python app.py
```

The application will start on the local Flask development server.

Open the displayed local address in your browser.

---

## 📈 Expected Results

The system produces:

* Intersection-level traffic summaries
* Zone-level traffic statistics
* Congestion clusters
* Peak-hour analysis
* Weekly traffic trends
* Traffic hotspot visualizations
* AI-generated future scenarios
* IoT security threat analysis
* Interactive dashboard visualizations

---

## Security Architecture

The security analysis focuses on protecting the traffic IoT data pipeline.

A simplified architecture is:

```text
IoT Traffic Sensors
        │
        ▼
 Authentication
        │
        ▼
 Secure Data Transmission
        │
        ▼
 Data Processing Layer
      PySpark
        │
        ▼
 Analytics / ML Layer
        │
        ▼
 Flask Dashboard
```

Security controls considered include:

* Device authentication
* Access control
* Secure communication
* Data integrity validation
* Logging and monitoring
* Protection against denial-of-service attacks
* Role-based access control

---

## Limitations

This project is primarily an academic and analytical prototype.

Some limitations include:

* The dataset is simulated/curated rather than a live city traffic feed.
* GPT-2 generates scenario text and is not a validated traffic forecasting model.
* KMeans clusters are dependent on the selected features and preprocessing.
* The Flask application is intended for demonstration rather than production deployment.
* Real-world deployment would require live IoT infrastructure and additional security controls.

---

## Future Enhancements

Possible future improvements include:

* Real-time IoT traffic-stream processing
* Apache Kafka integration
* Spark Structured Streaming
* Real-time congestion prediction
* LSTM/GRU-based time-series forecasting
* Geographic visualization using interactive maps
* Real-time alerts for high-congestion intersections
* Cloud deployment using AWS
* S3-based data storage
* Docker containerization
* Authentication and role-based dashboard access
* Real-time IoT security monitoring

---

## Academic Concepts Demonstrated

This project combines several important Computer Science and Big Data concepts:

* Big Data Analytics
* Distributed Data Processing
* MapReduce
* Apache PySpark
* Exploratory Data Analysis
* Machine Learning
* KMeans Clustering
* Data Visualization
* Natural Language Generation
* Web Application Development
* REST-style backend concepts
* IoT Security
* STRIDE Threat Modeling
* Data-driven Decision Support

---

## Author

**Sitikanth Sahoo**

Computer Science & Engineering Student

* **GitHub:** https://github.com/sitikanthsahoo
* **LinkedIn:** https://www.linkedin.com/in/sitikanth-sahoo-57934428b/
* **Kaggle:** https://www.kaggle.com/sitikanthsahoo

---

## Project Summary

**Smart City Traffic Analytics Dashboard** demonstrates how Big Data processing, Machine Learning, AI, Web Development, and IoT Security can be combined into a single smart-city analytics platform.

The project follows an incremental development approach:

```text
Raw Traffic Data
       ↓
Data Preprocessing
       ↓
PySpark Processing
       ↓
MapReduce Aggregation
       ↓
KMeans Clustering
       ↓
Trend & Hotspot Analysis
       ↓
AI Scenario Generation
       ↓
STRIDE Security Analysis
       ↓
Flask Dashboard
```

The final system provides an end-to-end view of urban traffic data, from large-scale processing and machine learning to visualization and IoT security analysis.
