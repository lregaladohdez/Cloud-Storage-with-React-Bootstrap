import { ReactElement } from "react";
import FileListItem from "./FileListItem";

function FilesList(): ReactElement { 
    return (<div>
        <ul>
            <li><FileListItem></FileListItem></li>
            <li><FileListItem></FileListItem></li>
            <li><FileListItem></FileListItem></li>
        </ul>
    </div>)
}


export default FilesList