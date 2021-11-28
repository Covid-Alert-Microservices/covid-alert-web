import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { covidTestApi, CovidTestData } from "../../store/api/covid-tests";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
    test: CovidTestData;
}

const DeleteTest = ({ open, onClose, test }: IProps) => {
    const [deleteTest] = covidTestApi.useDeleteCovidTestMutation();

    const handleDeleteConfirm = () => {
        deleteTest(test.id);
        onClose(true);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-alert-dialog-title"
            aria-describedby="delete-alert-dialog-description"
        >
            <DialogTitle id="delete-alert-dialog-title">
                Are you sure you want to delete this test ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-alert-dialog-description">
                    This action is irreversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={onClose}>Cancel</Button>
                <Button variant='outlined' onClick={handleDeleteConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}


export default DeleteTest;