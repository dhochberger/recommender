import { Paper } from '@mui/material'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    ScatterDataPoint,
    Title,
    Tooltip,
} from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const BarRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'bar', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Bar options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default BarRecommender
