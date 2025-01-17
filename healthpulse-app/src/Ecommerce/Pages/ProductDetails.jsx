// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductService from "../Sercice/ProductService";
// import ProductResult from "../Components/ProductResult"; // Import ProductResult
// import axios from "axios";
// import { geminiKey } from "../../servicePage/apiKeys"; // Ensure you have your API key
// import "./ProductDetails.css";

// const apiKeyGemini = geminiKey;

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [aiResponse, setAiResponse] = useState("");
//   const [loadingAi, setLoadingAi] = useState(false);

//   // useEffect(() => {
//   //   const fetchProduct = async () => {
//   //     try {
//   //       const data = await ProductService.getProductById(productId);
//   //       setProduct(data);

//   //       const relatedData = await ProductService.searchByChemicalName(
//   //         data.chemicalName
//   //       );
//   //       setRelatedProducts(relatedData);
//   //     } catch (err) {
//   //       setError(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProduct();
//   // }, [productId]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await ProductService.getProductById(productId);
//         setProduct(data);

//         const relatedData = await ProductService.searchByChemicalName(
//           data.chemicalName
//         );

//         // Ensure related products have image in base64
//         const updatedRelatedProducts = relatedData.map((product) => ({
//           ...product,
//           img: product.img.startsWith("data:image")
//             ? product.img
//             : `data:image/jpeg;base64,${product.img}`,
//         }));

//         setRelatedProducts(updatedRelatedProducts);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleLearnMoreAI = async () => {
//     if (!product) return;

//     setLoadingAi(true);
//     const prompt = `Provide detailed information about the chemical "${product.chemicalName}". Include its uses, side effects, history, and other relevant information.`;

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
//         {
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }
//       );

//       setAiResponse(
//         response.data.candidates[0].content.parts[0].text || "No result found"
//       );
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setAiResponse("Error in fetching AI response");
//     } finally {
//       setLoadingAi(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching product details: {error.message}</div>;

//   return (
//     <div>
//       <div className="product-details">
//         {product && (
//           <>
//             <img
//               src={`data:image/jpeg;base64,${product.img}`}
//               alt={product.productName}
//               className="product-details-image"
//             />
//             <h2 className="product-details-name">{product.productName}</h2>
//             <p className="product-details-description">{product.description}</p>
//             <p className="product-details-price">
//               Price: $
//               {product.discountPrice ? product.discountPrice : product.price}
//             </p>
//             {product.discountPrice && (
//               <p className="original-price">${product.price}</p>
//             )}
//             <p className="product-details-company">
//               Company: {product.companyName}
//             </p>
//             <p className="product-details-chemical">
//               Chemical: {product.chemicalName}
//             </p>

//             {/* Learn More from AI Button */}
//             <button onClick={handleLearnMoreAI} disabled={loadingAi}>
//               {loadingAi ? "Analyzing..." : "Learn More from AI"}
//             </button>

//             <button className="" style={{ marginLeft: "2px" }}>
//               Add to Cart
//             </button>

//             {aiResponse && (
//               <div className="ai-response">
//                 <h5>AI Response:</h5>
//                 <div dangerouslySetInnerHTML={{ __html: aiResponse }} />
//               </div>
//             )}
//           </>
//         )}
//         {/* Related Products Section */}
//       </div>
//       {/* Related Products Section */}
//       <h3>Related Products</h3>
//       <div className="related-products-grid">
//         <ProductResult products={relatedProducts} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;












// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductService from "../Sercice/ProductService";
// import ProductResult from "../Components/ProductResult"; // Import ProductResult
// import axios from "axios";
// import { geminiKey } from "../../servicePage/apiKeys"; // Ensure you have your API key
// import "./ProductDetails.css";

// const apiKeyGemini = geminiKey;

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [aiResponse, setAiResponse] = useState("");
//   const [loadingAi, setLoadingAi] = useState(false);
//   const [showFullResponse, setShowFullResponse] = useState(false);

//   const handleToggleResponse = () => {
//     setShowFullResponse(!showFullResponse);
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await ProductService.getProductById(productId);
//         setProduct(data);

//         const relatedData = await ProductService.searchByChemicalName(
//           data.chemicalName
//         );

//         // Ensure related products have image in base64
//         const updatedRelatedProducts = relatedData.map((product) => ({
//           ...product,
//           img: product.img.startsWith("data:image")
//             ? product.img
//             : `data:image/jpeg;base64,${product.img}`,
//         }));

//         setRelatedProducts(updatedRelatedProducts);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleLearnMoreAI = async () => {
//     if (!product) return;

//     setLoadingAi(true);
//     const prompt = `Provide detailed information about the chemical "${product.chemicalName}". Include its uses, side effects, history, and other relevant information.`;

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
//         {
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }
//       );

//       setAiResponse(
//         response.data.candidates[0].content.parts[0].text || "No result found"
//       );
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setAiResponse("Error in fetching AI response");
//     } finally {
//       setLoadingAi(false);
//     }
//   };

//   const formatAiResponse = (response) => {
//     return response.split("\n").map((line, index) => {
//       if (line.startsWith("## ")) {
//         return <h4 key={index}>{line.replace("## ", "")}</h4>;
//       } else if (line.startsWith("**")) {
//         return <strong key={index}>{line.replace(/\*\*/g, "")}</strong>;
//       } else if (line.startsWith("* ")) {
//         return <li key={index}>{line.replace("* ", "")}</li>;
//       }
//       return <p key={index}>{line}</p>;
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching product details: {error.message}</div>;

//   return (
//     <div>
//       <div className="product-details">
//         {product && (
//           <>
//             <img
//               src={`data:image/jpeg;base64,${product.img}`}
//               alt={product.productName}
//               className="product-details-image"
//             />
//             <h2 className="product-details-name">{product.productName}</h2>
//             <p className="product-details-description">{product.description}</p>
//             <p className="product-details-price">
//               Price:
//               {product.discountPrice ? product.discountPrice : product.price}
//                - BDT
//             </p>
//             {product.discountPrice && (
//               <p className="original-price">BDT {product.price}</p>
//             )}
//             <p className="product-details-company">
//               Company: {product.companyName}
//             </p>
//             <p className="product-details-chemical">
//               Chemical name: {product.chemicalName}
//             </p>

//             {/* Learn More from AI Button */}
//             <button
//               className="product-button"
//               onClick={handleLearnMoreAI}
//               disabled={loadingAi}
//             >
//               {loadingAi ? "Analyzing..." : "Learn More from AI"}
//             </button>

//             <button className="product-button" style={{ marginLeft: "2px" }}>
//               Add to Cart
//             </button>

//             {aiResponse && (
//               <div className="ai-response">
//                 <h5>AI Response:</h5>
//                 <div>
//                   {formatAiResponse(
//                     showFullResponse
//                       ? aiResponse
//                       : aiResponse.substring(0, 500) +
//                           (aiResponse.length > 500 ? "..." : "")
//                   )}
//                 </div>
//                 {aiResponse.length > 500 && (
//                   <button
//                     className="product-button"
//                     onClick={handleToggleResponse}
//                   >
//                     {showFullResponse ? "Show Less" : "Show More"}
//                   </button>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       {/* Related Products Section */}
//       {/* <h3>Related Products</h3>
//       <div className="related-products-grid">
//         <ProductResult products={relatedProducts} />
//       </div> */}
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../Sercice/ProductService";
import axios from "axios";
import { geminiKey } from "../../servicePage/apiKeys";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { getUserData } from "../../service/user-service"; // Import user service
import "./ProductDetails.css";

const apiKeyGemini = geminiKey;

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(false);

  const handleToggleResponse = () => {
    setShowFullResponse(!showFullResponse);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleLearnMoreAI = async () => {
    if (!product) return;

    setLoadingAi(true);
    const prompt = `Provide detailed information about the chemical "${product.chemicalName}". Include its uses, side effects, history, and other relevant information.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }
      );

      setAiResponse(
        response.data.candidates[0].content.parts[0].text || "No result found"
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error in fetching AI response");
    } finally {
      setLoadingAi(false);
    }
  };

  const formatAiResponse = (response) => {
    return response.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return <h4 key={index}>{line.replace("## ", "")}</h4>;
      } else if (line.startsWith("**")) {
        return <strong key={index}>{line.replace(/\*\*/g, "")}</strong>;
      } else if (line.startsWith("* ")) {
        return <li key={index}>{line.replace("* ", "")}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    const user = getUserData(); // Get current user data
    if (!user) {
      toast.error("Please log in to add items to the cart."); // Show error toast
      return;
    }

    const userId = user.id; // Retrieve the user ID
    const productId = product.productId; // Get current product ID
    const quantity = 1; // Default quantity to add

    // Call ProductService to add the product to the cart
    ProductService.addProductToCart(userId, productId, quantity)
      .then(() => {
        toast.success("Product added to cart successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        toast.error("Failed to add product to cart. Please try again."); // Show error toast
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details: {error.message}</div>;

  return (
    <div>
      <div className="product-details">
        {product && (
          <>
            <img
              src={`data:image/jpeg;base64,${product.img}`}
              alt={product.productName}
              className="product-details-image"
            />
            <h2 className="product-details-name">{product.productName}</h2>
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-price">
              Price:
              {product.discountPrice ? product.discountPrice : product.price}-
              BDT
            </p>
            {product.discountPrice && (
              <p className="original-price">BDT {product.price}</p>
            )}
            <p className="product-details-company">
              Company: {product.companyName}
            </p>
            <p className="product-details-chemical">
              Chemical name: {product.chemicalName}
            </p>

            {/* Add to Cart Button */}
            <button className="product-button" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* Learn More from AI Button */}
            <button
              className="product-button"
              onClick={handleLearnMoreAI}
              disabled={loadingAi}
              style={{ marginLeft: "2px" }}
            >
              {loadingAi ? "Analyzing..." : "Learn More from AI"}
            </button>

            {/* AI Response */}
            {aiResponse && (
              <div className="ai-response">
                <h5>AI Response:</h5>
                <div>
                  {formatAiResponse(
                    showFullResponse
                      ? aiResponse
                      : aiResponse.substring(0, 500) +
                          (aiResponse.length > 500 ? "..." : "")
                  )}
                </div>
                {aiResponse.length > 500 && (
                  <button
                    className="product-button"
                    onClick={handleToggleResponse}
                  >
                    {showFullResponse ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add the ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
