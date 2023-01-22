import { ReactElement } from "react";
import { Alert } from "react-bootstrap";
import { UploadCenterFile } from "../services/api";
import FileListItem from "./FileListItem";

function FilesList({ files }: { files: UploadCenterFile[] }): ReactElement {
    return (
        <>
            {
                files.length
                    ? files.map(f => <FileListItem key={f.id} file={f}></FileListItem>)
                    : <Alert variant="info">
                        <Alert.Heading>Files Not found </Alert.Heading>
                        <p>
                            No matching files were found.
                        </p>
                    </Alert>
            }
        </>)
}


export default FilesList