import React from 'react';
import './AttachmentModal.css'
import ModalTriggerer from './ModalTriggerer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    const [cardId, setCardId] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        ModalTriggerer.subscribe({
            "open": (id) => {
                console.log(id)
                setCardId(id)
                setOpen(true)
                const { colId, cardId } = id
                Global._fetch(`/countAttachments/${colId}/${cardId}`)
                    .then((data) => {
                        console.log(data)
                    })
            }
        })
        return () => {
            ModalTriggerer.unsubscribe()
        }
    }, [])
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
                        {cardId?.colId + "-" + cardId?.cardId} Attachments
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AttachmentModal;