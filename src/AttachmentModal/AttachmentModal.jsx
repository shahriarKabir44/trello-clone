import React from 'react';
import './AttachmentModal.css'
import ModalTriggerer from './ModalTriggerer';
import Box from '@mui/material/Box';
import { FaFileUpload } from "react-icons/fa";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
    const [file, setFile] = React.useState(null);

    React.useEffect(() => {
        ModalTriggerer.subscribe({
            "open": (id) => {
                console.log(id)
                setCardId(id)
                setOpen(true)
                const { colId, cardId } = id
                Global._fetch(`/getAttachments/${colId}/${cardId}`)
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
        setFile(file)
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
                        {card?.colId + "-" + card?.cardId} Attachments
                    </Typography>
                    <input type="file" name="" id="" ref={fileUploadRef} onChange={(e) => {
                        handleFileChange(e)
                    }} style={{
                        display: 'none'
                    }} />
                    <div className="attachedFilesHeader">
                        <p>{fileList.length} Attachment(s)</p>
                        <FaFileUpload onClick={() => {
                            fileUploadRef.current.click()
                        }} />
                    </div>
                    <button onClick={() => {
                        const { colId, cardId } = card
                        Global.uploadFile(file, {
                            ext: file?.type,
                            filename: file?.name,
                            columnId: colId,
                            cardId
                        })
                    }}>Upload</button>
                </Box>
            </Modal>
        </div>
    );
}

export default AttachmentModal;