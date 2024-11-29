import { Button, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { PublishedWithChanges as WorkIcon,Check as CheckIcon } from '@mui/icons-material'

const UpdateTaskStatusModal = ({open,closeHandler,task}) => {
  return (
    <Dialog
        open={open}
        onClose={closeHandler}

    >
        <DialogTitle>Update Status</DialogTitle>
        {
            task.status === "pending" ? (
                <>
                <Button variant="outlined" startIcon={<WorkIcon/>}>
                Working</Button>
                </>
            ):(
                <>
                <Button variant="outlined" startIcon={<CheckIcon/>}>
                Mark Done</Button>
                </>
            )
        }

    </Dialog>
  )
}

export default UpdateTaskStatusModal