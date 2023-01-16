import { url } from "inspector";
import { ReactElement } from "react";
import { Button, Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons"
import logo from "../logo.svg";

function FileListItem(): ReactElement{ 
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
</svg>`.replace(/\n/g,' ')
    
    return (<Stack style={{
        margin: 4,
        borderRadius: 10,
        boxShadow: ' 0px 1px 1px 0px rgba(0, 0, 0, 0.3)',
        backgroundImage: `linear-gradient(to right, #03A9F420, ${uploadPercent}% , #0d0d0d09)`,
    }} direction="horizontal" gap={1}>
        <div className="m-2" style={{borderRadius: 10}}>
            <Icon.MusicNote color="#1976D2" size={48}></Icon.MusicNote>
        </div>
        <Stack className="m-2 me-auto d-flex align-items-start justify-content-centers" style={{
            backgroundImage: `url('data:image/svg+xml;utf8,${svg}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}>
            <h4 style={{fontSize: 14}} >File Tile</h4>
            <h5 style={{ fontSize: 12, color: '#00000070' }}>uploading { uploadPercent}%. 15 minutes remaingin</h5>
        </Stack>
        
        <Icon.PauseFill color="#03A9F4"  title="Pause"></Icon.PauseFill>
        <Icon.XCircleFill color="#FF5252" size={16}></Icon.XCircleFill>
        <Icon.Trash3Fill color="#03A9F4" size={16}></Icon.Trash3Fill>
        <Icon.ThreeDotsVertical color="#03A9F4" size={16}></Icon.ThreeDotsVertical>
        <div className="m-2"></div>
    </Stack>)
}

export default FileListItem