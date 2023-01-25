import { useCallback } from "react"
import { Ratio, Stack } from "react-bootstrap"
import Dropzone from "react-dropzone";
import * as Icon from "react-bootstrap-icons"
import { FileStatus, FileType, UploadCenterFile, uploadFile } from "../services/api";

function Uploader({ addFile }: { addFile: Function }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    await Promise.all(acceptedFiles.map(f => { 
      let type: FileType;
      
      if (f.type.includes('image')) {
        type = FileType.Image;
      } else if (f.type.includes('audio') || f.type.includes('video')) {
        type = FileType.Video;
      } else if (f.type.includes('document') || f.type.includes('pdf')) { 
        type = FileType.Document;
      } else { 
        type = FileType.Archive
      }

      uploadFile({
        size: f.size / 1024 / 1024,
        name: f.name,
        type
      }).then(f => { 
        addFile(f);
      })

    }))
  }, [addFile])
  return (
    <Stack direction="horizontal" gap={3} className="flex-wrap">
      <div className="me-auto">
        <h4 style={{ textAlign: 'left' }}><b>Upload Center</b></h4>
        <p style={{ textAlign: 'left', color: '#00000070' }} >
          Drag and drop your file here to start uploading.<br></br>
          You can encrypt your file before uploading.
        </p>
      </div>
      <div style={{marginRight: 15}}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div style={{borderRadius: 10, borderStyle: 'dashed', background: '#1976D211', borderColor: '#1976D255'}}>
              <div {...getRootProps()} style={{ margin: 20 }}>
                <input {...getInputProps()} />
                <Icon.CloudArrowUpFill color="#1976D2" size={96}></Icon.CloudArrowUpFill>
                <p style={{color: '#1976D2'}}>Upload your file</p>
              </div>
            </div>
          )}
        </Dropzone>
        
      </div>
      
    </Stack>
  )
}


export default Uploader