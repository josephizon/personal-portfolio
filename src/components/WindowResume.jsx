import { useRef, useState } from 'react';
import DraggableDiv from '../scripts/DraggableDiv';
import { Document, Page, pdfjs} from 'react-pdf';
import resume from '../assets/resume.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function WindowResume({clickClose}) {
  const headerRef = useRef(null);
  const [isMaximized, setMaximize] = useState(false);

  const clickMaximize = () => {
    setMaximize((prev) => !prev); // toggle
  };

  return (
    <DraggableDiv dragHandleRef={headerRef} maximize={isMaximized}>
      {/* main div: the whole white thing */}
      <div className={`w-full h-full bg-white border-2 border-black flex flex-col`}>
        {/* div for header bar */}
        <div className='grid grid-cols-[1fr_auto_auto] '> 
          <div
            ref={headerRef}
            className="px-2 py-1 flex items-start bg-gray-800 text-white font-sora border-black border-b-2 cursor-grab"
          >
            <div className="w-5 h-5 mr-2 bg-white"></div>
            izon-resume.pdf - PDF VIEWER
          </div>

          <div onClick={clickMaximize} className="py-1 w-10 text-center content-center bg-gray-800 hover:bg-gray-600 transition-colors border-black border-b-2 cursor-default">&#xf2d1;</div>
          <div onClick={clickClose} className="py-1 w-10 text-center content-center bg-gray-800 hover:bg-red-500 transition-colors border-black border-b-2 cursor-default">X</div>
        </div>
        
        
        {/* outer div after the top window bar */}
        <div className="p-2 text-black bg-gray-500 flex flex-1 justify-center overflow-x-hidden min-h-0">
          <div className="h-fit m-4 p-2 bg-white ">
            <Document 
              file={resume}
              onLoadError={console.error}
             >
              <Page 
                pageIndex={0}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                />
            </Document>

            
          </div>
        </div>
      </div>
    </DraggableDiv>
  );
}
