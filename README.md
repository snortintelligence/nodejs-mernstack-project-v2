# nodejs-mernstack-project-v2

**Features of the App:**

1. **Create Products:** The app allows users to create new products by entering a product name and price. When the user submits the create form, a POST request is sent to the Node.js service to create a new product.

2. **List Products:** The app displays a list of existing products in an HTML table. It fetches this list from the Node.js service using a GET request when the page loads and after creating, editing, or deleting a product.

3. **Edit Products:** Users can edit existing products by clicking the "Edit" button next to a product in the table. This action opens an edit form populated with the current product details. Users can modify the name and price of the product and then save the changes. A PUT request is sent to the Node.js service to update the product.

4. **Delete Products:** Users can delete existing products by clicking the "Delete" button next to a product in the table. This action sends a DELETE request to the Node.js service to remove the product from the database.

**Integration of Node.js Service with UI:**

The integration of the Node.js service with the UI is achieved through the following steps:

1. **Express.js API:** The Node.js service is created using the Express.js framework. It defines several API endpoints to handle CRUD operations for products. These endpoints include `/api/products` for creating and listing products, `/api/products/:id` for updating and deleting products.

2. **HTML Interface:** The UI is built using HTML. It consists of an HTML form for creating products and an HTML table for listing products. It also includes an edit form that is initially hidden.

3. **JavaScript:** The JavaScript code in the `app.js` file is responsible for managing the interaction between the UI and the Node.js service.

   - **Fetch Products:** When the page loads, the JavaScript code sends a GET request to `/api/products` to fetch the list of products from the Node.js service. It populates the HTML table with the retrieved data.

   - **Create Product:** When the user submits the create form, the JavaScript code collects the input values, sends a POST request to `/api/products` to create a new product, and then updates the UI with the new product.

   - **Edit Product:** Clicking the "Edit" button next to a product triggers an event listener. The code collects the current product's details from the table, displays them in the edit form, and allows the user to modify them. When the user clicks "Save" in the edit form, a PUT request is sent to `/api/products/:id` to update the product.

   - **Delete Product:** Clicking the "Delete" button next to a product triggers an event listener. It sends a DELETE request to `/api/products/:id` to delete the selected product.

4. **Data Synchronization:** After each create, edit, or delete operation, the JavaScript code updates the UI by re-fetching the list of products from the Node.js service. This ensures that the UI remains synchronized with the server's data.

Overall, this integration allows users to interact with the Node.js service through the UI, providing a seamless and interactive way to perform CRUD operations on products.

