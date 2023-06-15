import { Grid, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

const App: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Home</Typography>
            </Grid>
        </Grid>
    )
}
export default App
