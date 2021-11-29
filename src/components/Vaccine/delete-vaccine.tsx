import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { vaccineApi } from "../../store/api/vaccine";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
}

const DeleteVaccine = ({ open, onClose }: IProps) => {
    const [deleteVaccine] = vaccineApi.useDeleteVaccineMutation();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleDeleteConfirm = () => {
        deleteVaccine(null)
            .then((res) => {
                if ("error" in res) {
                    console.log(res.error)
                    setOpenSnackbar(true);
                }
                else {
                    onClose(true);
                }
            })
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => { setOpenSnackbar(false) }}
                message="Sorry, something went wrong"
            />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="delete-alert-dialog-title"
                aria-describedby="delete-alert-dialog-description"
            >
                <DialogTitle id="delete-alert-dialog-title">
                    Are you sure you want to delete this vaccine ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-alert-dialog-description">
                        This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size='large' sx={{ color: 'text.disabled' }} onClick={onClose}>Cancel</Button>
                    <Button size='large' color='primary' variant="outlined" onClick={handleDeleteConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default DeleteVaccine;