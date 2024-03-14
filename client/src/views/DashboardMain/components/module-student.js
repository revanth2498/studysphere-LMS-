// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useParams } from 'react-router-dom';

// function StudentModulesView() {
//   const [modules, setModules] = useState([]);
//   const params = useParams();

//   useEffect(() => {
//     console.log("this is inside student modules");
//     console.log(params.id);
//     fetch(`http://localhost:8000/Course/getModulesByCourseFiles/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setModules(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const openFileInNewWindow = (fileUrl) => {
//     window.open(fileUrl, '_blank');
//   };


  

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Class Modules
//       </Typography>
//       <Grid container spacing={2}>
//         {modules.map((module, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   {module.moduleName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   {module.content}
//                 </Typography>
//                 {module.file && (
//                   <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => openFileInNewWindow(module.file.url)}
//                 >
//                   Open the document
//                   </Button>                                                    
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default StudentModulesView;







// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useParams } from 'react-router-dom';
// import { Document, Page,pdfjs } from 'react-pdf';



// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// function WordDocumentViewer({ documentUrl }) {
//   return (
//     <div style={{ width: '100%', height: '800px' }}>
//       <iframe
//         src={`https://docs.google.com/gview?url=${documentUrl}&embedded=true`}
//         style={{ width: '100%', height: '100%', border: 'none' }}
//         title="Word Document Viewer"
//       ></iframe>
//     </div>
//   );
// }

// function StudentModulesView() {
//   const [modules, setModules] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const params = useParams();

//   useEffect(() => {
//     console.log("this is inside student modules");
//     console.log(params.id);
//     fetch(`http://localhost:8000/Course/getModulesByCourseFiles/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setModules(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [params.id]);

//   const openFileInViewer = (fileUrl) => {
//     setSelectedFile(fileUrl);
//   };

//   const closeViewer = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Class Modules
//       </Typography>
//       <Grid container spacing={2}>
//         {modules.map((module, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   {module.moduleName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   {module.content}
//                 </Typography>
//                 {module.file && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => openFileInViewer(module.file.url)}
//                   >
//                     Open the document
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       {selectedFile && (
//         <div>
//           <Button variant="contained" color="secondary" onClick={closeViewer}>
//             Close Document Viewer
//           </Button>
//           {selectedFile.endsWith('.pdf') ? (
//             <Document
//                          file={selectedFile}
//                            onLoadError={(error) => console.log('Error while loading PDF:', error)}
//                        >
//                          <Page pageNumber={1} />
//                        </Document>
           
//           ) : (
//             <WordDocumentViewer documentUrl={selectedFile} />
//           )}
//         </div>
//       )}
//     </Container>
//   );
// }

// export default StudentModulesView;


import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Button from '@mui/material/Button';




function StudentModulesView() {


  const [modules, setModules] = useState([]);
  const params = useParams();
  

  // const openFileInNewWindow = (fileUrl) => {
  //   window.open(fileUrl, '_blank');
  // };

  const openFileInNewWindow = (fileUrl) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}`;
    window.open(googleDocsViewerUrl, '_blank');
  };
  
  // const openFileInViewer = (fileUrl) => {
  //   // Define supported file types and their corresponding viewers
  //   const file = {
  //     type: 'docx', // Change this according to the file type
  //     url: fileUrl,
  //   };

  //   // Call the file viewer component
  //   setModules([file]); // Pass the file details to the file viewer
  // };

  useEffect(() => {
    
    console.log(
      "this is inside student modules"
    )
    console.log(params.id)
    fetch(`http://localhost:8000/Course/getModulesByCourseFiles/${params.id}`) 
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setModules(data)              
            })
            .catch((error) => {
                console.log(error)
            });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Class Modules
      </Typography>
      <Grid container spacing={2}>
        {modules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {module.moduleName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {module.content}
                  </Typography>
                  {module.file && (
                 <Typography variant="body2" color="textSecondary" component="p">
                File Name: {module.file.filename}
                 </Typography>
            )&& (<Button
              variant="contained"
              color="primary"
              onClick={() => openFileInNewWindow(module.file.url)}
            >
              Open the document
            </Button>)}
            

                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
          </Container>
   
  );
}


export default StudentModulesView;


