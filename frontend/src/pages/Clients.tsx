import { Autocomplete, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from 'src/components'
import { GET_REQUEST, SERVER_URL } from 'src/config/api'
import store from 'src/redux/store'
import { Client as ClientType, defaultClient } from 'src/types/Client'
import { Client } from './ClientsComponents'
const Clients: FunctionComponent = () => {
    const { t } = useTranslation()

    const [maxUsersNumber, setMaxUsersNumber] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${SERVER_URL}/clients`, GET_REQUEST).then(res => {
            setMaxUsersNumber(res.data.data.length)
            setClients(res.data.data.map((item: number) => ({ ...defaultClient, id: item })))
            setLoading(false)
        })
    }, [])

    const [clients, setClients] = useState<ClientType[]>([])
    const [selectedClient, setSelectedClient] = useState<ClientType>(defaultClient)

    useEffect(() => {
        console.log(store.getState())
        axios.get(`${SERVER_URL}/clients/${selectedClient?.id}`, GET_REQUEST).then(res => {
            setSelectedClient(old => ({ ...old, ...res.data.data }))
        })
    }, [selectedClient.id])

    return (
        <>
            <LoadingSpinner value={loading} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} mt={2}>
                    <Autocomplete
                        disablePortal
                        options={clients}
                        filterOptions={(option, state) =>
                            option.filter((item, index) => item.id.toString().startsWith(state.inputValue)).slice(0, 15)
                        }
                        getOptionLabel={option => option.id.toString()}
                        onChange={(e, value) => (value ? setSelectedClient(old => ({ ...old, id: value!.id })) : null)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={`Utilisateurs uniques : ${maxUsersNumber}`}
                                sx={{
                                    color: theme => theme.palette.secondary.main,
                                    backgroundColor: theme => theme.palette.common.white,
                                    borderRadius: '8px',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Client client={selectedClient} />
            </Grid>
        </>
    )
}
export default Clients
