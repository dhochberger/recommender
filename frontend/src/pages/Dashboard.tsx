import { Grid } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from 'src/components'
import { CardNumber } from 'src/components/Cards'
import { Bar, Line, Pie } from 'src/components/Charts'
import { GET_REQUEST, SERVER_URL } from 'src/config/api'
import { currentLanguageCode } from 'src/config/i18n'
import { monthsEnum } from 'src/types/labelsEnum'

const Dashboard: FunctionComponent = () => {
    const { t } = useTranslation()

    const returnProductObject = (products: { label: [[number, string]]; data: number[] }) => {
        const productsDatas: { label: string; data: number[] }[] = products.data.reduce(
            (prev: { label: string; data: number[] }[], currentItem: number, currentIndex: number) => {
                console.log({ prev, currentItem, currentIndex })
                return prev.some(item => item.label === products.label[currentIndex][1])
                    ? [
                          ...prev.filter(item => item.label !== products.label[currentIndex][1]),
                          {
                              label: products.label[currentIndex][1],
                              data: [
                                  ...prev.find(item => item.label === products.label[currentIndex][1])!.data,
                                  currentItem,
                              ],
                          },
                      ]
                    : [...prev, { label: products.label[currentIndex][1], data: [currentItem] }]
            },
            []
        )
        return productsDatas
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${SERVER_URL}/dashboard`, GET_REQUEST).then(res => {
            console.log('resData', res.data)

            setMaxUsersNumber(res.data.data.total)
            setPriceYear(res.data.data.price)
            setClientsYear(res.data.data.clients)

            setMaxProductsNumber(res.data.data.total_products)
            setProductsYear(returnProductObject(res.data.data.products))
            setFamilyCount(res.data.data.family)

            setChartLabels(res.data.label.map((item: number) => ({ id: item, label: t(monthsEnum[item]) })))
            setLoading(false)
        })
    }, [])

    const [loading, setLoading] = useState(false)
    const [maxUsersNumber, setMaxUsersNumber] = useState('-')
    const [priceYear, setPriceYear] = useState([])
    const [clientsYear, setClientsYear] = useState([])

    const [maxProductsNumber, setMaxProductsNumber] = useState('-')
    const [productsYear, setProductsYear] = useState<{ label: string; data: number[] }[]>([])
    const [familyCount, setFamilyCount] = useState<{ label: string[]; data: number[] }>({ label: [], data: [] })

    const [chartLabels, setChartLabels] = useState<{ id: number; label: string }[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        setLabels(chartLabels.map(item => t(monthsEnum[item.id])))
    }, [t, currentLanguageCode, chartLabels])

    return (
        <>
            <LoadingSpinner value={loading} />
            <Grid container item xs={12} direction="column">
                <Grid container item xs={12}>
                    <Grid item xs={4}>
                        <CardNumber label="Annual users" value={maxUsersNumber} />
                    </Grid>
                </Grid>
                <Grid container item spacing={1} xs>
                    <Grid item xs={12} md={6}>
                        <Line
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: 'Clients',
                                        data: clientsYear,
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Clients par mois',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Line
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: 'Prix',
                                        data: priceYear,
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(162, 53, 235, 0.5)',
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'CA par mois',
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4}>
                        <CardNumber label="Yearly sold products" value={maxProductsNumber} />
                    </Grid>
                </Grid>
                <Grid container item spacing={1} xs>
                    <Grid item xs={12} md={6}>
                        <Bar
                            data={{
                                labels,
                                datasets: productsYear.map((item, index) => ({
                                    label: item.label,
                                    data: item.data,
                                    borderColor: `rgb(${28 * index}, ${128 / index + 28}, ${255 - 28 * index})`,
                                    backgroundColor: `rgb(${28 * index}, ${128 / index + 28}, ${
                                        255 - 28 * index
                                    }, 0.5)`,
                                })),
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'vente famille par mois',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Pie
                            data={{
                                labels: familyCount.label,
                                datasets: [
                                    {
                                        label: 'product sold by family',
                                        data: familyCount.data,
                                        borderColor: familyCount.data.map(
                                            (item, index) =>
                                                `rgb(${28 * index}, ${128 / index + 28}, ${255 - 28 * index}, 0.75)`
                                        ),
                                        backgroundColor: familyCount.data.map(
                                            (item, index) =>
                                                `rgb(${28 * index}, ${128 / index + 28}, ${255 - 28 * index}, 0.5)`
                                        ),
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'product sold by family',
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Dashboard
