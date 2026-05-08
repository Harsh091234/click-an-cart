#   🌟 Click-an-cart
A full-stack ecommerce app for clothing with authentication, cart, coupons, secure checkout, and admin controls for products and orders.

## 🚀 Live Preview
**Site Url:** [https://click-an-cart.onrender.com](https://click-an-cart.onrender.com)

##  ✨ Features

- 🔐 Secure Authentication – Signup, login, Google OAuth, email verification, and password reset with JWT  
- 🛒 Smart Cart – Add, remove, update quantity, or clear all items in one click  
- 🎟️ Coupon System – Apply discount codes during checkout for special offers  
- 💳 Secure Payments – Stripe   
- 🎁 Personalized Experience – Product recommendations  
- ⚙️ Admin Panel – Manage products
- 📈 Analytics Dashboard – Track sales, revenue, and cart abandonment stastistic


## 🛠️ Tech Stack


### 🎯 Frontend
- **Framework:** React with Vite  
- **State Management:** Zustand  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM  
- **HTTP Client:** Axios  

### ⚙️ Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (JSON Web Tokens) + Google OAuth (google-auth-library)  
- **Password Hashing:** bcryptjs  
- **Image Upload:** Cloudinary  
- **CORS:** Enabled for cross-origin requests  
- **Session & Cache:** Redis  
- **Email Service:** Nodemailer  
- **Payments:** Stripe  

### 🧰 Development Tools
- **Build Tool:** Vite  
- **Package Manager:** npm  


## Screenshots
![Screenshot 1](/client/public/Screenshots/s1.png)
![Screenshot 2](/client/public/Screenshots/s2.png)
![Screenshot 3](/client/public/Screenshots/s3.png)
![Screenshot 4](/client/public/Screenshots/s4.png)
![Screenshot 5](/client/public/Screenshots/s5.png)
![Screenshot 6](/client/public/Screenshots/s6.png)
![Screenshot 7](/client/public/Screenshots/s7.png)
![Screenshot 8](/client/public/Screenshots/s8.png)
![Screenshot 9](/client/public/Screenshots/s9.png)
![Screenshot 10](/client/public/Screenshots/s10.png)
![Screenshot 11](/client/public/Screenshots/s11.png)

## 🚀 Getting Started


### Prerequisites
- Node.js (version specified in package.json)
- npm 
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh091234/click-an-cart.git
   cd click-an-cart
   ```

2. **Build project**
   ```bash
    npm run build
   ```


   ### 🔧 Environment Variables Setup

   #### Server (.env)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/ecommerce

UPSTASH_REDIS_URL=redis://default:<your_redis_password>@<your_redis_url>:6379

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

APP_PASSWORD=your_app_password   # Gmail app password (16 characters, no spaces)

NODE_ENV=development
```

#### Client (.env)
Create a `.env` file in the `client` directory:
```env
MODE=development
```

### 🚀 Running the Application

#### Development Mode (Live Preview)

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`