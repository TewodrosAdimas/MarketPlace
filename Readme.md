# MarketPlace - Full Stack E-commerce Platform

This repository contains the source code for MarketPlace, a full-stack application featuring a backend API built with Python/Django Rest Framework and a frontend user interface built with React.ts and Bootstrap.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Technology Stack](#technology-stack)
4.  [Prerequisites](#prerequisites)
5.  [Setup and Installation](#setup-and-installation)
    *   [Backend Setup](#backend-setup)
    *   [Frontend Setup](#frontend-setup)
6.  [Running the Application](#running-the-application)
    *   [Running the Backend](#running-the-backend)
    *   [Running the Frontend](#running-the-frontend)
7.  [API Documentation](#api-documentation)
    *   [Base URL](#base-url)
    *   [Authentication](#authentication)
    *   [User Endpoints](#user-endpoints)
    *   [Product Endpoints](#product-endpoints)
    *   [Cart Endpoints](#cart-endpoints)
    *   [Error Responses](#error-responses)
8.  [Environment Variables](#environment-variables)
9.  [Contributing](#contributing)
10. [License](#license)

## Project Overview

 This project is an e-commerce platform allowing users to register as buyers or sellers. Buyers can browse products, add items to their cart, and view their cart. Sellers can manage their product listings.

## Features

*   User registration (Buyer/Seller roles)
*   User login/logout using JWT authentication
*   Seller accounts require admin approval (optional flow)
*   Browse and view product listings
*   Sellers can create, update, and delete their products
*   Buyers can add products to their shopping cart
*   Buyers can view and remove items from their shopping cart
*   Responsive frontend design using Bootstrap

## Technology Stack

*   **Backend**:  Python, Django, Django Rest Framework , SQLite
*   **Frontend**: React.ts, TypeScript, Bootstrap, React Router
*   **API Communication**: RESTful API, JWT for authentication

## Prerequisites

*   Node.js and npm/yarn installed ([Link to Node.js download](https://nodejs.org/))
*   Python installed ([Link to Python download](https://www.python.org/))
*   Pip (Python package installer)
*   Git

## Setup and Installation

Clone the repository first:

```bash
git clone https://github.com/TewodrosAdimas/MarketPlace.git
cd MarketPlace

Backend Setup
1 Navigate to the backend directory:
    cd backend 
2 Create and activate a virtual environment:
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate

3. Install dependencies:
    pip install -r requirements.txt
4. Apply database migrations:
    python manage.py migrate
5. Create a superuser (for admin access):
    python manage.py createsuperuser

Frontend Setup
1.Navigate to the frontend directory:  
    cd ../frontend 
2. Install dependencies:
    npm install

Running the Application
Running the Backend
1.Ensure your virtual environment is activated and you are in the backend directory.
2.Start the Django development server:
    python manage.py runserver
3. The backend API will typically be available at http://127.0.0.1:8000.

Running the Frontend
1. Navigate to the frontend directory.
2. Start the React development server:
    npm run dev
3. The frontend application will typically open automatically in your browser at http://localhost:3000.

API Documentation
    Are available at each apllications directory