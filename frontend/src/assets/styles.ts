import { createTheme, Theme } from '@mui/material'

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface defaultTheme extends Theme {}
}

const styleSheet = {
    /* Box shadows */
    boxShadow:
        '0 0.625rem 1.875rem -0.75rem rgba(0, 0, 0, 0.42), 0 0.25rem 1.5625rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.2)',
}

export const MAIN_FONT = 'Hind Siliguri, sans serif'

const fonts = {
    mainFont: MAIN_FONT,
}

// https://material-ui.com/customization/themes/
let theme = createTheme({
    palette: {
        primary: { main: '#5B5F97', light: '#DEC0F1', dark: '#5B5F97' }, // Usage : <Button color="primary">Primary</Button>
        secondary: { main: '#434E85', light: '#AFA2E0', dark: '#5D4FC2' },
        success: { main: '#BBEB78' },
        warning: { main: '#F57105' },
        error: { main: '#AD0A4E' },
    },
    typography: {
        fontFamily: fonts.mainFont,
        h1: {
            fontFamily: fonts.mainFont,
        },
        h2: {
            fontFamily: fonts.mainFont,
        },
        h3: {
            fontFamily: fonts.mainFont,
        },
        h4: {
            fontFamily: fonts.mainFont,
        },
        h5: {
            fontFamily: fonts.mainFont,
        },
        subtitle1: {
            fontFamily: fonts.mainFont,
        },
        subtitle2: {
            fontFamily: fonts.mainFont,
        },
        button: {
            lineHeight: 1,
        },
    },
})

theme = createTheme(theme, {
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.primary.main,
                },
                label: {
                    color: '#FFFFFF',
                },
                deleteIcon: {
                    color: '#FFFFFF',
                    '&:hover': {
                        color: theme.palette.grey[300],
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color: theme.palette.primary.main,
                },
                colorSecondary: {
                    color: theme.palette.secondary.main,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.mainFont,
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    color: theme.palette.common.black,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        opacity: 0.5,
                        backgroundColor: 'none',
                    },
                    fontFamily: fonts.mainFont,
                    textTransform: 'none',
                    padding: '0.6rem',
                },
                textPrimary: {
                    '&:hover': {
                        opacity: 0.5,
                        backgroundColor: 'none',
                    },
                },
                containedPrimary: {
                    // Usage : <Button variant="contained" color="primary">Button Primary</Button>
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                },
                containedSecondary: {
                    // Usage : <Button variant="contained" color="secondary">Button Secondary</Button>
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.secondary.main,
                },
                containedInherit: {
                    // Usage : <Button variant="contained" color="inherit">Button Inherit</Button>
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.common.white,
                },
                contained: {
                    fontSize: '1.25rem',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey[900],
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    padding: 0,
                },
                underline: {
                    '&:before': {
                        borderBottom: '0rem !important',
                    },
                    '&:after': {
                        borderBottom: '0rem !important',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginRight: '1rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    margin: '1rem',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.primary.main,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                },
            },
        },
    },
})

const styles = { styleSheet, theme, fonts }

export default styles
