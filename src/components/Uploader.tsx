import { Stack } from "react-bootstrap"

 function Uploader() { 
  return (
    <Stack direction="horizontal" gap={3} className="flex-wrap">
      <div className="me-auto">
      <h4 style={{ textAlign: 'left' }}><b>Upload Center</b></h4>
      <p style={{ textAlign: 'left',color: '#00000070' }} >
        Drag and drop your file here to start uploading.<br></br>
        You can encrypt your file before uploading.
      </p>
      </div>
      <div>
        Uploader XXXX
      </div>
      
    </Stack>
    )
}


export default Uploader