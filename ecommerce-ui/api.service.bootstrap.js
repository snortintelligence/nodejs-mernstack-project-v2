document.addEventListener("DOMContentLoaded", () => {
  //use controls reference name
  // create form
  const createForm = document.getElementById("create-form");
  const productName = document.getElementById("create-name");
  const productPrice = document.getElementById("create-price");
  const productDescription = document.getElementById("create-description");
  const productCategory = document.getElementById("create-category");

  // edit form
  const editForm = document.getElementById("edit-form");
  const editId = document.getElementById('edit-id');
  const editProductName = document.getElementById("edit-name");
  const editProductPrice = document.getElementById("edit-price");
  const editProductDescription = document.getElementById("edit-description");
  const editProductCategory = document.getElementById("edit-category");

  // table reference
  const productList = document.getElementById("product-list");

  // Function to fetch and display products
  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        productList.innerHTML = "";
        data.forEach((product) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${product.id}</td>
              <td>${product.title}</td>
              <td>$${product.price}</td>
              <td>${product.description}</td>
              <td>${product.category}</td>
              <td><button class="btn btn-danger btn-sm delete-button" data-id="${product.id}">Delete</button></td>
              <td><button class="btn btn-warning btn-sm edit-button" data-id="${product.id}">Edit</button></td>
            `;
          productList.appendChild(tr);
        });
      });
  };

  // Function to handle product deletion
  const handleDelete = (event) => {
    if (event.target.classList.contains("delete-button")) {
      const productId = event.target.getAttribute("data-id");

      if (confirm(`Do you want to delete the product id : "${productId}"?`)) {
        fetch(`http://localhost:5000/api/products/${productId}`, {
          method: "DELETE",
        })
          .then(() => {
            fetchProducts();
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          });
      }
      }
  };

  // Event listener for product creation
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      title: productName.value,
      price: parseFloat(productPrice.value),
      description: productDescription.value,
      category: productCategory.value,
    };

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        productName.value = "";
        productPrice.value = "";
        productDescription.value = "";
        productCategory.value = "";
        fetchProducts();
      });
  });

  // Event listener for delete button clicks
  productList.addEventListener("click", handleDelete);

  // Edit Form handling
  // Function to display the edit form
  const showEditForm = (product) => {
    editId.value = product.id;
    editProductName.value = product.title;
    editProductPrice.value = product.price;
    editProductDescription.value = product.description;
    editProductCategory.value = product.category;
    editForm.style.display = "block";
  };

  const hideEditForm = () => {
    // edit-cancel-button
    editForm.style.display = "none";
  };

  productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-cancel-button')) {
      hideEditForm();
    }
  });

  // Event listener for "Edit" button clicks
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-button')) {
    const productId = e.target.getAttribute('data-id');
    const productRow = e.target.parentElement.parentElement;
    const product = {
      id: parseInt(productId),
      title: productRow.cells[1].textContent,
      price: parseFloat(productRow.cells[2].textContent.replace('$', '')),
      description: productRow.cells[3].textContent,
      category: productRow.cells[4].textContent,
    };
    showEditForm(product);
  }
});

// Event listener for "Edit" button in edit form
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const updatedProduct = {
    id: parseInt(editId.value),
    title: editProductName.value,
    price: parseFloat(editProductPrice.value),
    description: editProductDescription.value,
    category: editProductCategory.value,
  };

  fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => response.json())
    .then(() => {
      editForm.style.display = 'none';
      fetchProducts();
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });
});  

  // Initial fetch to load products
  fetchProducts();
});
