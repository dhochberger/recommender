import { Card, CardContent, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useLayoutsStyles } from 'src/assets'
import styles from 'src/assets/styles'

const theme = styles.theme

interface Props {
    value: number | string
    label: string
    isPositive?: boolean
}

const CardNumber: FunctionComponent<Props> = ({ value, label, isPositive }) => {
    const styles = useLayoutsStyles(theme)

    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="h5" sx={{ color: isPositive ? 'green' : 'red' }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardNumber
