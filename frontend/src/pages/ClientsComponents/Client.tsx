import { Grid, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { CardNumber } from 'src/components/Cards'
import { Client } from 'src/types/Client'

interface Props {
    client: Client
}

const Client: FunctionComponent<Props> = ({ client }) => {
    const { t } = useTranslation()

    return (
        <Grid container item spacing={2}>
            <Grid container item xs={6} direction="column">
                <CardNumber label={"Nombre d'achat sur l'année"} value={client.nb_achat} />
            </Grid>
            <Grid container item xs={6} direction="column">
                <CardNumber label={"Nombre de passages sur l'année"} value={client.nb_passage} />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        color: theme => theme.palette.common.white,
                        borderRadius: '8px',
                        padding: '1.1rem',
                        fontSize: '1.5rem',
                    }}
                >
                    Mailles préférées
                </Typography>
            </Grid>
            {client.maille.map((item, index) => (
                <Grid key={index} container item xs={6} lg={4} direction="column">
                    <CardNumber label={''} value={item} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Typography
                    sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        color: theme => theme.palette.common.white,
                        borderRadius: '8px',
                        padding: '1.1rem',
                        fontSize: '1.5rem',
                    }}
                >
                    Familles préférées
                </Typography>
            </Grid>
            {client.famille.map((item, index) => (
                <Grid key={index} container item xs={6} lg={4} direction="column">
                    <CardNumber label={''} value={item} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Typography
                    sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        color: theme => theme.palette.common.white,
                        borderRadius: '8px',
                        padding: '1.1rem',
                        fontSize: '1.5rem',
                    }}
                >
                    Univers préférés
                </Typography>
            </Grid>
            {client.univers.map((item, index) => (
                <Grid key={index} container item xs={6} lg={4} direction="column">
                    <CardNumber label={''} value={item} />
                </Grid>
            ))}
        </Grid>
    )
}
export default Client
