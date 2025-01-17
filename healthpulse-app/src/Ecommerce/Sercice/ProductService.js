import { privateAxios, myAxios } from "../../service/helper";

class ProductService {
  // Method to create a new product (requires authentication)
  createProduct(productData, imgFile = null) {
    // Create FormData object to handle file upload and JSON
    const formData = new FormData();
    formData.append("productDto", JSON.stringify(productData));

    if (imgFile) {
      formData.append("img", imgFile);
    }

    return privateAxios
      .post(`/ecommerce/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error creating the product!", error);
        throw error;
      });
  }

  // Method to get a product by ID
  getProductById(productId) {
    return myAxios
      .get(`/ecommerce/product/${productId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the product by ID!", error);
        throw error;
      });
  }

  // Method to get all products
  getAllProducts() {
    return myAxios
      .get(`/ecommerce/product/`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching all products!", error);
        throw error;
      });
  }

  // Method to update a product (requires authentication)
  updateProduct(productId, productData, imgFile = null) {
    const formData = new FormData();
    formData.append("productDto", JSON.stringify(productData));

    if (imgFile) {
      formData.append("img", imgFile);
    }

    return privateAxios
      .put(`/ecommerce/product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error updating the product!", error);
        throw error;
      });
  }

  // Method to delete a product
  deleteProduct(productId) {
    return privateAxios
      .delete(`/ecommerce/product/${productId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
        throw error;
      });
  }

  // Method to search products by chemical name
  searchByChemicalName(chemicalName) {
    return myAxios
      .get(`/ecommerce/product/search/chemicalName/${chemicalName}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error searching products by chemical name!",
          error
        );
        throw error;
      });
  }

  // Method to search products by company name
  searchByCompanyName(companyName) {
    return myAxios
      .get(`/ecommerce/product/search/companyName/${companyName}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error searching products by company name!",
          error
        );
        throw error;
      });
  }

  // Method to filter products by price range
  filterByPriceRange(minPrice, maxPrice) {
    return myAxios
      .get(`/ecommerce/product/filter/price`, {
        params: { minPrice, maxPrice },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error filtering products by price range!",
          error
        );
        throw error;
      });
  }

  // Method to get distinct company names
  getDistinctCompanyNames() {
    return myAxios
      .get(`/ecommerce/product/companies`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching distinct company names!",
          error
        );
        throw error;
      });
  }

  // Method to get distinct chemical names
  getDistinctChemicalNames() {
    return myAxios
      .get(`/ecommerce/product/chemicals`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching distinct chemical names!",
          error
        );
        throw error;
      });
  }

  // Method to fetch the cart by user ID
  getCartByUserId(userId) {
    return privateAxios
      .get(`/ecommerce/cart/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the cart!", error);
        throw error;
      });
  }

  // Method to add a product to the cart
  addProductToCart(userId, productId, quantity) {
    return privateAxios
      .post(`/ecommerce/cart/${userId}/add/${productId}/${quantity}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error adding the product to the cart!",
          error
        );
        throw error;
      });
  }

  // Method to delete a single cart item
  deleteCartItem(userId, cartItemId) {
    return privateAxios
      .delete(`/ecommerce/cart/${userId}/remove/${cartItemId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error deleting the cart item!", error);
        throw error;
      });
  }

  // Method to update the quantity of a cart item (increase or decrease)
  updateCartItemQuantity(userId, cartItemId, quantity) {
    return privateAxios
      .put(`/ecommerce/cart/${userId}/update/${cartItemId}/${quantity}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error updating the cart item quantity!",
          error
        );
        throw error;
      });
  }

  // Method to clear the entire cart
  clearCart(userId) {
    return privateAxios
      .delete(`/ecommerce/cart/${userId}/clear`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error clearing the cart!", error);
        throw error;
      });
  }
}

export default new ProductService();
