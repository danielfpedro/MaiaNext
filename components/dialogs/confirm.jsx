import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';

export default ({
    open,
    title,
    text,
    cancelText,
    confirmText,
    handleCancelDeleteConfirm,
    handleConfirmDeleteConfirm
}) => (

    <Dialog
        open={open}
        keepMounted
        >
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancelDeleteConfirm} color="primary">
                Disagree
            </Button>
            <Button onClick={handleConfirmDeleteConfirm} color="primary">
                Agree
            </Button>
        </DialogActions>
  </Dialog>
)