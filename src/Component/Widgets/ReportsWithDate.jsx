/* eslint-disable react/prop-types */
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import LoadingState from "../Elements/LoadingState";
// import ErrorMessage from "../Elements/ErrorMessage";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReportsWithDate = ({ apiUrl }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filename, setFileName] = useState("");

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError("Please choose the Start Date and the End Date!");
      return;
    }
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      const response = await axios.post(
        apiUrl,
        {
          startDate: startDate,
          endDate: endDate,
        },
        { responseType: "blob" }
      );

      // Extract filename from headers
      const contentDisposition = response.headers["content-disposition"];
      let tempfilename = "document.pdf"; // Default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (filenameMatch && filenameMatch[1]) {
          tempfilename = filenameMatch[1].replace(/['"]/g, "");
        }
      }
      setFileName(tempfilename);

      // Create PDF preview URL
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfFile(pdfUrl);
      setShowPDF(true);
    } catch (err) {
      setError("Error fetching PDF: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = pdfFile;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    setError("Error loading PDF: " + error.message);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "See Report"
              )}
            </button>
            {loading && <LoadingState />}
            {pdfFile && (
              <button
                className="btn btn-success ms-3"
                onClick={handleDownloadPDF}
              >
                Download Pdf
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <div className="col-12 mb-4">
            {/* PDF Viewer */}
            {showPDF && (
              <div className="card">
                <div className="card-body">
                  {loading && (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {pdfFile && (
                    <>
                      <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                          <div className="text-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <Page
                          pageNumber={pageNumber}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          className="mx-auto"
                          width={Math.min(window.innerWidth * 0.9, 800)}
                        />
                      </Document>
                      {numPages && (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <button
                            onClick={goToPreviousPage}
                            disabled={pageNumber <= 1}
                            className="btn btn-primary"
                          >
                            Previous
                          </button>

                          <p className="mb-0">
                            Page {pageNumber} of {numPages}
                          </p>

                          <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="btn btn-primary"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsWithDate;
