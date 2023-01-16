import { ReactElement } from "react";
import { Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons"
import logo from "../logo.svg";

function FileListItem (): ReactElement{ 
    return (<Stack direction="horizontal">
        <Icon.MusicNote size={48} style={{backgroundImage: logo, backgroundBlendMode: 'lighten'}}></Icon.MusicNote>
        <h3>aaa</h3>
    </Stack>)
}

export default FileListItem