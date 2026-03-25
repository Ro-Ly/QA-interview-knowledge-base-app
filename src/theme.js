import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8ab4ff',
        },
        secondary: {
            main: '#b39ddb',
        },
        background: {
            default: '#0b1020',
            paper: '#121a2b',
        },
        text: {
            primary: '#f5f7fb',
            secondary: '#aab4c8',
        },
        divider: 'rgba(255,255,255,0.08)',
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 500,
        },
        body1: {
            lineHeight: 1.75,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        'radial-gradient(circle at top, rgba(60,90,160,0.25), transparent 30%), #0b1020',
                    minHeight: '100vh',
                },
                '*': {
                    boxSizing: 'border-box',
                },
                a: {
                    color: 'inherit',
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#121a2b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px !important',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
                    '&:before': {
                        display: 'none',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                },
                content: {
                    margin: '14px 0',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    backgroundColor: 'rgba(138,180,255,0.12)',
                    border: '1px solid rgba(138,180,255,0.25)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 14,
                        backgroundColor: 'rgba(255,255,255,0.03)',
                    },
                },
            },
        },
    },
});

export default theme;