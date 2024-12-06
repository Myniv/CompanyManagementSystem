import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast /*ToastContainer*/ } from "react-toastify";

const UploadFiles = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB dalam bytes
  const ALLOWED_FILE_TYPES = [
    "application/pdf", // PDF
    "application/msword", // DOC
    "image/jpeg",
    "image/jpg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  ];

  const { fixUpload, setFixUpload } = useOutletContext();

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB limit";
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only PDF and Word documents are allowed";
    }
    return null;
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        setSelectedFile(null);
        event.target.value = ""; // Reset input file
        return;
      }
      setSelectedFile(file);
      toast.info(`File selected: ${file.name}`);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    setIsLoading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:5045/api/v1/Employees/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      toast.success(response.data);
      setSelectedFile(null);
      setFixUpload(true);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      let errorMessage = "Upload failed";
      if (error.response) {
        errorMessage = `Upload failed: ${error.response.data}`;
      } else if (error.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "40px", height: "40px" }} 
      /> */}
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose File (PDF or Word, max 5MB)
          </label>
          <input
            type="file"
            onChange={handleFileSelect}
            className="form-control"
            accept=".pdf,.doc,.docx,.jpg,.jpeg"
            disabled={fixUpload}
          />
          {selectedFile && (
            <div className="mt-2 text-muted">
              Selected file: {selectedFile.name} (
              {formatFileSize(selectedFile.size)})
            </div>
          )}
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-3">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading || fixUpload}
          hidden={!selectedFile || isLoading || fixUpload}
          className={`btn ${
            isLoading ? "btn-secondary" : "btn-primary"
          } btn-sm`}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Submit File"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadFiles;
