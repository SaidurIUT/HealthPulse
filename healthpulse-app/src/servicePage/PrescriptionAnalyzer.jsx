import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/PrescriptionAnalyzer.css";
import TextToSpeechButton from "./TextToSpeechButton";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import banner from "../images/banner/kidsCorner.mp4";
import VirusL from "../components/LottieComponents/Virus";
import HeartL from "../components/LottieComponents/Heart";
import { geminiKey, visionApi } from "./apiKeys";

const PrescriptionAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [visionText, setVisionText] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const apiKeyVision = visionApi;
  const apiKeyGemini = geminiKey;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visionText || result) {
      setLoading(false);
    }
  }, [visionText, result]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file first!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        setIsGenerating(true);

        // Google Cloud Vision API Request
        const visionResponse = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKeyVision}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: "DOCUMENT_TEXT_DETECTION",
                  },
                ],
              },
            ],
          }
        );

        const textAnnotations =
          visionResponse.data.responses[0]?.textAnnotations?.map(
            (annotation) => annotation.description
          ) || [];

        const combinedText = textAnnotations.join(" ");
        setVisionText(combinedText);
        console.log("Combined text:", combinedText);

        // Gemini Text API Request
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: `This text probably contains some medicine names. Can you guess the names and provide when these medicines are used?Please answer in one single paragraph containing all the information The text is ${combinedText}.Please provide necessary information of the medicines if possible`,
                    },
                  ],
                },
              ],
            }
          );

          setResult(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
          console.error("Error with Gemini API request:", error);
          setResult(
            "Sorry - Something went wrong with the Gemini API. Please try again!"
          );
        }
      } catch (error) {
        console.error("Error with Google Cloud Vision API request:", error);
        setResult(
          "Sorry - Something went wrong with the Vision API. Please try again!"
        );
      } finally {
        setIsGenerating(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>

          <div className="content-container">
            <div className="left-side">
              <VirusL />
            </div>
            <div className="middle-side">
              <div className="image-analyzer-container">
                <h1 className="heading">Prescription Analyzer</h1>
                <form onSubmit={handleSubmit}>
                  <div className="button-group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      id="fileInput"
                      className="file-input"
                    />
                    <label htmlFor="fileInput" className="btn">
                      Choose Prescription
                    </label>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Processing..." : "Process Prescription"}
                    </button>
                  </div>
                </form>

                {visionText && !loading && (
                  <div className="card">
                    <h2>Extracted Text By AI</h2>
                    <p>{visionText}</p>
                    <TextToSpeechButton text={visionText} />
                  </div>
                )}
                {result && !loading && (
                  <div className="card">
                    <h2>Medicines Usecases By AI</h2>
                    <p>{result}</p>
                    <TextToSpeechButton text={result} />
                  </div>
                )}
              </div>
            </div>
            <div className="right-side">
              <HeartL />
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default PrescriptionAnalyzer;
