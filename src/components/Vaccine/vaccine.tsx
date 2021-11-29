import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import useDialogControls from "../../hooks/useDialogControls";
import { Vaccine } from "../../store/api/vaccine";
import DeleteVaccine from "./delete-vaccine";
import UpdateVaccine from "./update-vaccine";

interface IProps {
    vaccine: Vaccine;
}

const VaccineItem = ({ vaccine }: IProps) => {

    const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useDialogControls();
    const [isUpdateDialogOpen, openUpdateDialog, closeUpdateDialog] = useDialogControls();

    return (
        <>
            <Card variant='outlined' sx={{ my: 5, mx: 'auto', width: '50%' }}>
                <CardContent>
                    <Typography variant="h4" component="div" sx={{ mb: 5, textAlign: 'center' }}>
                        {vaccine.disease}
                        <br />
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Vaccine :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.vaccine}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Vaccine medicinal product :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.vaccineMedicinalProduct}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Manufacturer :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.manufacturer}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Dose number :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.doseNumber} / {vaccine.doseNumberMax}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Vaccination date :
                        </Typography>
                        <Typography variant="body2">
                            {new Date(vaccine.vaccinationDate).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Member state :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.memberState}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Certificate Issuer :
                        </Typography>
                        <Typography variant="body2">
                            {vaccine.certificateIssuer}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={2} sx={{ mx: 'auto' }}>
                        <Button variant='outlined' size='small' onClick={openUpdateDialog}>Edit</Button>
                        <Button size='small' color='error' onClick={openDeleteDialog}>Delete</Button>
                    </Stack>
                </CardActions>
            </Card>

            <DeleteVaccine
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
            />

            <UpdateVaccine
                open={isUpdateDialogOpen}
                onClose={closeUpdateDialog}
                vaccine={vaccine}
            />
        </>
    )
}

export default VaccineItem;