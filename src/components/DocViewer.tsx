// import DocViewer from 'react-doc-viewer';
// import { DocumentViewer } from 'react-documents';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function DocViewer({ src }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

// const DocumentViewer: React.FC<{ src: string }> = ({ src }) => {
//   return (
//     <div>
//       <iframe src={src} width="100%" height="400px"></iframe>
//     </div>
//   );
// };
// const DocViewer: React.FC<{ src: string }> = ({ src }) => {
//   // const docs = [{ uri: src }];

//   return (
//     <DocumentViewer
//       viewerUrl={'https://docs.google.com/gview?url=%URL%&embedded=true'}
//       url={src}
//       viewer="url"
//     ></DocumentViewer>
//   );
// };

export default DocViewer;
