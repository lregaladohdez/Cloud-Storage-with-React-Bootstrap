import { ReactElement } from "react";
import FileListItem from "./FileListItem";

function FilesList(): ReactElement { 
    return (<div>
            <FileListItem></FileListItem>
            <FileListItem></FileListItem>
            <FileListItem></FileListItem>
        
    </div>)
}


export default FilesList