# 🌀 Morphly

**Morphly** is a comprehensive file utility platform designed to simplify your digital workflow. Instead of using five different sketchy websites to convert a PDF, remove a background, or split a document, Morphly provides a single, secure, and beautiful interface for all these tasks.

## 🔗 Live Demo  

- **Live**: [morphly.sagarsaini.com](https://morphly.sagarsaini.com)  

## 🎯 Purpose of the Project  
Building a robust file converter requires solving challenges beyond simple UI design. This project was engineered to master the following technical competencies:  
- **Handling Binary Data & Streams**: Moving away from simple JSON APIs to manage complex Buffer, Blob, and Stream data types required for file processing.  
- **Serverless File Processing**: Implementing efficient file manipulation logic (conversion, compression) within Next.js API routes (Serverless functions) without timing out.  
- **AI API Integration**: Orchestrating third-party AI models for computationally expensive tasks like Background Removal, ensuring a responsive UX despite API latency.  
- **Storage Architecture**: Implementing secure file upload/download pipelines (likely using Presigned URLs or Cloudinary) to handle user assets safely.  

## ✨ Key Features

### 📄 Document Conversion
- Convert documents using **LibreOffice (headless)**  
- Supported formats:  
  - DOCX ↔ PDF  
  - PPTX ↔ PDF  
  - XLSX ↔ PDF  
- High fidelity output (no browser hacks)

### 🖼️ Image Tools
- Image format conversion (PNG, JPG, WEBP, etc.)  
- AI-powered **background removal**  
- Secure file handling  

### 👤 Authentication
- User authentication (login required)  
- Session-based access control  
- Guest mode intentionally disabled for stability (can be enabled later)  

### ⚙️ Scalable Architecture
- Microservice-based design  
- Independent services for:  
  - Web App (Next.js)  
  - Python AI processing  
  - LibreOffice file conversion  
- Dockerized & production-ready  


## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Font** | Manrope (Google Fonts) |
| **Theme** | next-themes (System/Dark/Light) |
| **State** | Zustand |
| **Deployment** | Vercel, Railway |


## 💡 System Design Decisions
Morphly uses a service-oriented architecture to keep concerns isolated and maintainable.  

- **Why Next.js as the Core Application?**
  - Handles authentication, authorization, and plan-based limits  
	-	Acts as the API gateway for all conversion requests  
  -	Manages user credits, conversion history, and file metadata  
	-	Serves both frontend and backend logic in a single deployable unit  

- **Python Microservice for PDF → DOCX**
  - Implemented using FastAPI   
	-	Dedicated solely to PDF-to-DOCX conversion using pdf2docx   
	-	Isolated from the main app to avoid blocking Node.js processes   
	-	Communicates internally over the Docker network   
 
- **LibreOffice for Document Conversions**
  - Runs in a separate container   
	-	Used for DOCX ↔ PDF ↔ TXT and related conversions   
	-	Executed in headless mode for predictable, reproducible results    
	-	Keeps complex binary dependencies out of the Node.js runtime  

- **Plan & Credit Enforcement**
  -	File size limits are enforced before conversion  
	-	Credits are deducted only after successful conversion  
	-	Conversion history is stored per user for traceability  

## 🔐 Environment Variables

```bash
DATABASE_URL=your-db-url
DIRECT_URL=your-db-direct-url
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabse-service-role-key
PYTHON_SERVICE_URL=https://localhost:5001
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PLUS_MONTHLY_PRICE_ID=your-stripe-plus-monthly-price-id
STRIPE_PLUS_YEARLY_PRICE_ID=your-stripe-plus-yearly-price-id
STRIPE_PRO_MONTHLY_PRICE_ID=your-stripe-pro-monthly-price-id
STRIPE_PRO_YEARLY_PRICE_ID=your-stripe-pro-yearly-price-id
```  

## 📦 Getting Started

### 1. Clone the repo
```bash
 git clone https://github.com/<your-username>/morphly.git
  cd morphly
```  

2. Install dependencies
```bash
npm install
```  

3. Database Setup
Ensure your PostgreSQL instance is running and the DATABASE_URL is set.  
```bash
npx prisma migrate dev
```  
5. Run the development server
```bash
npm run dev
```

## 🌍 Deployment

- **Frontend**: Vercel  
- **Database**: Hosted PostgreSQL (e.g., Supabase)

## 🧪 Upcoming Features / TODO

### 🔗 Infrastructure
- Background job queue (Redis / BullMQ)  
- Async conversion workers  
- Service-level health checks  
- Centralized logging  

### 🤖 Product Enhancements
-	More image processing tools  
-	Format auto-detection  
-	Conversion quality presets  
-	File compression options  

## Contributions

Contributions are welcome! Whether it's a new file converter, a bug fix, or a UI improvement.  

1.  Fork the Project  
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)  
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)  
4.  Push to the Branch (`git push origin feature/AmazingFeature`)  
5.  Open a Pull Request  


## 📇 Contact

Want to collaborate or give feedback?

- 🐦 Twitter: [@not_sagar1410](https://x.com/not_sagar1410)  
- 💼 LinkedIn: [Sagar Saini](https://www.linkedin.com/in/sagar-saini-9b45a52b2/)
