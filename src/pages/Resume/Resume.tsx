import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '../../components/Button';
import resumePdf from '../../assets/resume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './Resume.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const Resume: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="resume">
      <div className="container">
        <div className="resume__header">
          <h1 className="resume__title">Resume</h1>
          <p className="resume__subtitle">Ben Meeker · Software Engineer · Platform Engineering · IT Operations</p>
          <div className="resume__actions">
            <a href={resumePdf} download="Ben_Meeker_Resume.pdf">
              <Button variant="primary" size="lg">
                Download PDF
              </Button>
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Open in New Tab
              </Button>
            </a>
          </div>
        </div>

        <div className="resume__document">
          <Document
            file={resumePdf}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="resume__loading">Loading resume...</div>}
            error={<div className="resume__error">Failed to load PDF. Please use the download button above.</div>}
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="resume__page"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  width={undefined}
                />
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
