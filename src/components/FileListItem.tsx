import { ReactElement, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { UploadCenterFile, FileStatus, FileType, getFileId, stopUpload, resumeUpload, deleteFile } from "../services/api";
import prettyBytes from "pretty-bytes";
import { svgGraphFromData } from "../services/utils";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')

function FileListItem({ file }: { file: UploadCenterFile }): ReactElement {
    
    
    const [deleted, setDeleted] = useState(false)
    const [uploadProgres, setUploadProgress] = useState<({date: number,uploaded: number})[]>([])
    const [updatedFile, setUpdatedFile] = useState(file);
    
    async function handlePlayPause(stop: Boolean) {
        const newFile = stop ? await stopUpload(file.id) : await resumeUpload(file.id);
        setUpdatedFile({...newFile || updatedFile});
        
    }
    function handleDelete() {
        deleteFile(file.id).then(f => { 
            setDeleted(true);
        }).catch(e => { 

        })
        
    }

    useEffect(() => {
        if (updatedFile.status !== FileStatus.Uploading || !updatedFile.isUploading) { 
            return () => { };
        }
        const timer = setInterval(() => updateStatus(), 1000);
        return () => clearInterval(timer);
    });
    
    async function updateStatus() {
        const newFile = await getFileId(file.id);
        if (newFile?.status === FileStatus.Uploading) {
            setUploadProgress((p) => [...p, {
                date: Date.now(),
                uploaded: newFile.uploaded
            }])
        } else { 
            setUploadProgress([]);
        }
        return setUpdatedFile({ ...(newFile || updatedFile) });
    }

    let estimatedTime = uploadProgres.length > 1 ?
        Date.now() + (file.size - uploadProgres[0].uploaded)
        * (uploadProgres[uploadProgres.length - 1].date - uploadProgres[0].date)
        / (uploadProgres[uploadProgres.length - 1].uploaded - uploadProgres[0].uploaded)
        - (uploadProgres[uploadProgres.length - 1].date - uploadProgres[0].date)
        : 0
    
    estimatedTime = Math.min(estimatedTime, Number.MAX_SAFE_INTEGER);
    
    
    if (deleted) {
        return <></>
    }
    const uploadPercent = Math.round(updatedFile.uploaded / updatedFile.size * 100);

    const svg = updatedFile.isUploading
        ? svgGraphFromData(file.size, uploadProgres.map(u => ({ date: u.date, uploaded: u.uploaded })))
        : ''

    return (<Stack style={{
        margin: 4,
        borderRadius: 10,
        boxShadow: ' 0px 1px 1px 0px rgba(0, 0, 0, 0.3)',
        backgroundImage: updatedFile.status === FileStatus.Uploading
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
            backgroundImage: updatedFile.status === FileStatus.Uploading
                ? `url('data:image/svg+xml;utf8,${svg}')`
                : undefined,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}>
            <h4 style={{ fontSize: 14 }} >{file.name}</h4>
            <h5 style={{ fontSize: 12, color: '#00000070' }}>
                
                {updatedFile.status === FileStatus.Uploading
                    ? updatedFile.isUploading
                        ? `uploading ${uploadPercent}%. ${estimatedTime > 0
                            ? timeAgo.format(estimatedTime,'round').replace(/^in/,'') + ' remaining'
                            : 'calculating remaining time'}`
                        : `uploading ${uploadPercent}%. Stopped`
                    : `size: ${prettyBytes(updatedFile.size * 1024 * 1024,{maximumFractionDigits: 2})}, created: ${timeAgo.format(Date.parse(updatedFile.createdAt))}`
                }
            </h5>

    
            
        </Stack>
        {
            updatedFile.status === FileStatus.Uploading
                ? <>
                    {
                        file.isUploading
                            ? <Icon.PauseFill style={{cursor: 'pointer'}} color="#03A9F4" title="Pause" onClick={() =>handlePlayPause(true)}></Icon.PauseFill>
                            : <Icon.PlayFill style={{cursor: 'pointer'}} color="#03A9F4" title="Play" onClick={() => handlePlayPause(false)}></Icon.PlayFill>
                    }
                    
                    
                    <Icon.XCircleFill style={{cursor: 'pointer'}} color="#FF5252" onClick={handleDelete} size={16}></Icon.XCircleFill>
                </>
                : <>
                    {file.status === FileStatus.Uploaded && <Icon.Share color="#03A9F4" style={{cursor: 'pointer'}} title="Share" size={16}></Icon.Share>}
                    <Icon.Trash3Fill style={{cursor: 'pointer'}} onClick={handleDelete} color="#03A9F4" title="Delete" size={16}></Icon.Trash3Fill>
                    
                </>
        }
        
        
        <div className="m-2"></div>
    </Stack>)
}

export default FileListItem