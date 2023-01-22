import { ReactElement, useState } from "react";
import { Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { UploadCenterFile, FileStatus, FileType } from "../services/api";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')


function FileListItem({ file}:{ file: UploadCenterFile }): ReactElement{ 
    const uploadPercent = 90;
    const svg = `<svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
<path 
fill="none"
stroke="blue"
d="
M 0,100
L20 87
L50 96
L70 85
L120 97
"/>
</svg>`.replace(/\n/g, ' ')
    
    const [deleted, setDeleted] = useState(false)
    const [downloading, sedDownloading] = useState(file.status === FileStatus.Uploading)
    
    function handlePlayPause() { 
        sedDownloading(d => !d)
    }
    function handleDelete() { 
        setDeleted(true);
    }
    
    if (deleted) {
        return <></>
    }

    return (<Stack style={{
        margin: 4,
        borderRadius: 10,
        boxShadow: ' 0px 1px 1px 0px rgba(0, 0, 0, 0.3)',
        backgroundImage: file.status === FileStatus.Uploading
            ? `linear-gradient(to right, #03A9F420, ${uploadPercent}% , #0d0d0d09)`
            : undefined,
    }} direction="horizontal" gap={1}>
        <div className="m-2" style={{ borderRadius: 10 }}>
            {
                file.type === FileType.Archive && <Icon.Archive color="#1976D2" size={48}></Icon.Archive>
            }
            {
                file.type === FileType.Document && <Icon.FileWord color="#1976D2" size={48}></Icon.FileWord>
            }
            {
                file.type === FileType.Image && <Icon.Image color="#1976D2" size={48}></Icon.Image>
            }
            {
                file.type === FileType.Video && <Icon.PlayCircle color="#1976D2" size={48}></Icon.PlayCircle>
            }
        </div>
        <Stack className="m-2 me-auto d-flex align-items-start justify-content-centers" style={{
            backgroundImage: file.status === FileStatus.Uploading
                ? `url('data:image/svg+xml;utf8,${svg}')`
                : undefined,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}>
            <h4 style={{ fontSize: 14 }} >{file.name }</h4>
            <h5 style={{ fontSize: 12, color: '#00000070' }}>
                
                {file.status === FileStatus.Uploading
                    ? downloading
                        ? `uploading ${uploadPercent}%. 15 minutes remaining`
                        : `uploading ${uploadPercent}%. Stopped`
                    : `size: ${file.size} mb, created: ${timeAgo.format(Date.parse(file.createdAt))}`
                    }
            </h5>

    
            
        </Stack>
        {
            file.status === FileStatus.Uploading
                ? <>
                    {
                        downloading
                            ? <Icon.PauseFill color="#03A9F4" title="Pause" onClick={handlePlayPause}></Icon.PauseFill>
                            : <Icon.PlayFill color="#03A9F4" title="Play" onClick={handlePlayPause}></Icon.PlayFill>
                    }
                    
                    
        <Icon.XCircleFill color="#FF5252" size={16}></Icon.XCircleFill>
                </>
                : <>
                    {file.status === FileStatus.Uploaded && <Icon.Share color="#03A9F4" title="Share" size={16}></Icon.Share>}
                    <Icon.Trash3Fill onClick={handleDelete} color="#03A9F4" title="Delete" size={16}></Icon.Trash3Fill>
                    
                </>
        }
        
        
        <div className="m-2"></div>
    </Stack>)
}

export default FileListItem