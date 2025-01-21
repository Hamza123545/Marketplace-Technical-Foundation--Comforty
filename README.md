# Comforty Marketplace 🛒

## Project Overview 🚀
Comforty is an online marketplace aimed at providing a seamless shopping experience for students, office professionals, and gamers. The platform offers a wide range of products, dynamic browsing features, and efficient checkout processes. This README outlines the journey of developing and deploying the project, highlighting the key milestones.

---

## Day 1: Ideation and Conceptualization 💡
On Day 1, we focused on brainstorming ideas and defining the core concept for the marketplace. We discussed the platform’s target audience—students, office professionals, and gamers—and decided to design a user-friendly, dynamic online marketplace. This was a crucial step in understanding what features would resonate with our target users.

---

## Day 2: Technical Documentation 📑

On Day 2, we created the technical documentation outlining the structure and technologies that would be used to build the website. We specified:

- **Frontend**: Next.js with TypeScript and Tailwind CSS 🎨
- **Backend**: Sanity CMS for managing content 🗂️
- **APIs**: Integration with third-party APIs for shipment tracking and payment processing (static at the moment) 🔗

The documentation also detailed the workflow for data fetching and API integration, as well as how the content would be handled in Sanity.

---

## Day 3: API Integration 🔌

On Day 3, we focused on integrating the APIs. We fetched data from external APIs and used Sanity as our content management system. The APIs helped us display product information dynamically:

- **Sanity API**: Fetching data from Sanity for product details 📦.
- **External APIs**: Data fetching from a mock API (e.g., FakeStoreAPI) for dynamic product listings 🌐. We were able to successfully display this data on the website via Next.js API routes.

---

## Day 4: Adding Key Features 🔑

Day 4 was dedicated to implementing key features that enhanced user experience:

- **Product Comparison**: A dynamic product comparison feature for users to compare multiple products based on various attributes ⚖️.
- **Dynamic Routing**: Implemented dynamic routing to allow users to access product details, category pages, and more 🔄.
- **Product Details Page**: A page displaying detailed information about each product 🛍️.
- **Checkout Page**: Users could add products to the cart and proceed to checkout 💳.
- **Order Page**: A page that shows the user's order history 📝.
- **Analytics Page**: A page showing important insights about the marketplace's performance 📊 (e.g., best-selling products).

---

## Day 5: Testing with Lighthouse 🔍

On Day 5, we thoroughly tested the marketplace using the Lighthouse tool. We checked the performance of every page to ensure that it was smooth and responsive. The results were impressive, as we achieved a 100% performance score 🎯, which signifies that the platform is optimized for both speed and user experience.

---

## Day 6: Deployment to Vercel 🌐

On Day 6, we deployed the project to Vercel, ensuring that all environment variables were correctly set up. We handled:

- **Vercel Deployment**: Pushed the code to Vercel for production 🚀.
- **Sanity Cross-Origin**: Configured cross-origin settings to allow the integration between Sanity CMS and our website 🔗.
- **Environment Variables**: Ensured all necessary environment variables were added to Vercel's settings ⚙️.

---

## Additional Features ✨

We also implemented the **Search Bar** 🔎, allowing users to search products by keywords. This dynamic feature makes it easier for users to find exactly what they're looking for in real-time.

### Shipment Tracking (Static Implementation) 🚚
While we intended to implement dynamic shipment tracking via third-party APIs, for now, we have only provided static shipment tracking as a placeholder. Future updates will enable real-time tracking of shipments.

---

## Technologies Used 🛠️

- **Next.js** (Frontend Framework) ⚛️
- **TypeScript** (For type safety) 📝
- **Sanity CMS** (Backend content management) 🗃️
- **Tailwind CSS** (Styling) 💅
- **Vercel** (Deployment platform) 🌎
- **Lighthouse** (Performance Testing) 💡
- **Third-Party APIs** (To be integrated for dynamic shipment tracking and payment processing in the future) 🔌

---

## Future Plans 🔮

- **Dynamic Shipment Tracking**: Implement real-time shipment tracking using third-party APIs 🚚.
- **Payment Processing**: Integrate a payment gateway to allow secure transactions 💳.
- **Enhanced Analytics**: Provide more detailed analytics and insights to marketplace admins 📊.
- **User Authentication**: Add user sign-up/sign-in functionality 🔐.

---

## Conclusion 🎉

This project has been an exciting journey from ideation to deployment. The Comforty marketplace is a dynamic platform that offers an intuitive shopping experience for its target audience. With future enhancements, we aim to make it even more feature-rich and user-friendly.

