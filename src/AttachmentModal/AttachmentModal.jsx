import React from 'react';
import './AttachmentModal.css'
import { FaFileVideo } from "react-icons/fa";
import ModalTriggerer from './ModalTriggerer';
import Box from '@mui/material/Box';
import { FaFileUpload } from "react-icons/fa";
import Typography from '@mui/material/Typography';
import { CiMusicNote1 } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import { RiFileAddLine } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Global from '../Global';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AttachmentModal(props) {
    const [card, setCardId] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [fileList, setFileList] = React.useState([])
    const fileUploadRef = React.useRef(null)
    const [selectedFiles, setSelectedFiles] = React.useState([])
    function getAttachments() {
        const { columnId, cardId } = card
        Global._fetch(`/getAttachments/${columnId}/${cardId}`)
            .then(({ files }) => {
                setFileList(files)
            })
    }
    React.useEffect(() => {
        ModalTriggerer.subscribe({
            "open": (id) => {
                setCardId(id)
                setOpen(true)
                const { columnId, cardId } = id
                Global._fetch(`/getAttachments/${columnId}/${cardId}`)
                    .then(({ files }) => {
                        setFileList(files)
                    })
            }
        })
        return () => {
            ModalTriggerer.unsubscribe()
        }
    }, [])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return
        setSelectedFiles([...selectedFiles, {
            file,
            index: selectedFiles.length
        }])
        console.log(file)
        // Store the file in state or proceed with upload
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {card?.columnId + "-" + card?.cardId} Attachments
                    </Typography>
                    <input type="file" name="" id="" ref={fileUploadRef} onChange={(e) => {
                        handleFileChange(e)
                    }} style={{
                        display: 'none'
                    }} />
                    <div className="attachedFilesHeader">
                        <p>{fileList.length} Attachment(s)</p>
                        <RiFileAddLine style={{
                            fontSize: 30
                        }} onClick={() => {
                            fileUploadRef.current.click()
                        }} />
                    </div>
                    {selectedFiles.length > 0 && <div className="selectedFilePreviewContainer">
                        {selectedFiles.map((file, index) => <div key={index} className="selectedFile">
                            <p>{file.file.name}</p>
                            <FaRegTrashAlt onClick={() => {
                                console.log(file.file)
                                setSelectedFiles(selectedFiles.filter(file => file.index !== index))
                            }} />
                        </div>)}
                    </div>}
                    {selectedFiles.length > 0 && <button className='uploadImageBtn' onClick={() => {
                        const { columnId, cardId } = card
                        let promises = selectedFiles.map(({ file }) => {
                            return Global.uploadFile(file, {
                                ext: file?.type,
                                filename: file?.name,
                                columnId: columnId,
                                cardId
                            })
                        })
                        Promise.all(promises).then(() => {
                            getAttachments()
                            setSelectedFiles([])
                        })
                    }}>Upload</button>}
                    <div className="attachedFileContainer">
                        <p>Attached Files</p>
                        {fileList.length === 0 && <p>No File Attached</p>}
                        {fileList.length > 0 && <AttachedFileContainer files={fileList} />}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

function AttachedFileContainer({ files }) {
    function AttachedFilePreview({ filename }) {
        const ext = filename.split('.').pop()
        if (ext === 'png' || ext === 'jpeg' || ext === 'jpg') {
            return <a href={`${Global.SERVER_URL}/${filename}`} className="attachedFilePreview">
                <img src={`${Global.SERVER_URL}/${filename}`} alt="" />
                <p>{filename.split('/').pop()}</p>
            </a>
        }
        if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) {
            return <a href={`${Global.SERVER_URL}/${filename}`} className="attachedFilePreview">
                <CiMusicNote1 style={{
                    fontSize: "60px"
                }} />
                <p>{filename.split('/').pop()}</p>

            </a>
        }
        if (['mp4', 'mkv', 'flv', 'avi', 'webm'].includes(ext)) {
            return <a href={`${Global.SERVER_URL}/${filename}`} className="attachedFilePreview">
                <FaFileVideo style={{
                    fontSize: "60px"
                }} />
                <p>{filename.split('/').pop()}</p>

            </a>
        }
        return <a href={`${Global.SERVER_URL}/${filename}`} className="attachedFilePreview">
            <IoDocumentAttachOutline style={{
                fontSize: "60px"
            }} />
            <p>{filename.split('/').pop()}</p>

        </a>

    }
    return <div className="fileNameContainer">
        {files.map((file, _) => {
            return <AttachedFilePreview key={_} filename={file} />
        })}
    </div>
}

export default AttachmentModal;