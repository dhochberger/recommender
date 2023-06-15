import { Divider, Link, List, ListItem, ListItemText, Stack } from '@mui/material'
import { useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useTranslation } from 'react-i18next'
import { Link as LinkRouter, useLocation } from 'react-router-dom'
import { useLayoutsStyles } from 'src/assets'
import { currentLanguageCode } from 'src/config/i18n'

const RecommenderDrawer = () => {
    const styles = useLayoutsStyles()
    const location = useLocation()
    const { t, i18n } = useTranslation()

    const [selected, setSelected] = useState(
        currentLanguageCode === 'en' ? 'GB' : currentLanguageCode.toLocaleUpperCase()
    )

    const changeLanguage = (code: string) => {
        const cc = code === 'GB' ? 'en' : code.toLocaleLowerCase()

        i18n.changeLanguage(cc, (err, tr) => {
            tr('key')
        })
        setSelected(code)
    }
    return (
        <Stack sx={{ color: 'white', height: '100vh' }}>
            <List>
                <ListItem button key={'Home'}>
                    <ListItemText primary={'Home'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Dashboard', 'Daily', 'Clients', 'Stock'].map((text, index) => (
                    <Link
                        key={text}
                        sx={{
                            color: theme => theme.palette.common.white,
                        }}
                        underline="none"
                        component={LinkRouter}
                        to={`/${text.toLocaleLowerCase()}`}
                    >
                        <ListItem
                            sx={{
                                backgroundColor: theme =>
                                    location.pathname === `/${text.toLocaleLowerCase()}`
                                        ? theme.palette.secondary.light
                                        : theme.palette.primary.main,
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['My account', 'Contact support'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ReactFlagsSelect
                        countries={['GB', 'FR']}
                        placeholder=""
                        fullWidth
                        showOptionLabel={false}
                        showSelectedLabel={false}
                        selected={selected}
                        onSelect={code => changeLanguage(code)}
                    />
                </ListItem>
            </List>
        </Stack>
    )
}
export default RecommenderDrawer
