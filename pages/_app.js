import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import MyAppBar from '../components/layout/MyAppBar'
import MainDrawer from '../components/layout/MainDrawer'
import MobileNav from '../components/layout/MobileNav'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
  },
}))

export default function MyApp(props) {
  const classes = useStyles()
  const { Component, pageProps } = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const [darkMode, setDarkMode] = useState(
    // This will check the user/system settings to see if dark mode is preferred.
    useMediaQuery('(prefers-color-scheme: dark)')
  )

  const toggleShowDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpenDrawer(!openDrawer)
  }

  const theme = useMemo(
    () =>
      createMuiTheme({
        themeName: 'greenOrange',
        palette: {
          primary: { main: '#144d53' },
          secondary: { main: '#ff9100' },
          type: darkMode ? 'dark' : 'light',
        },
        typography: {
          // Overide `body2` to use a serif font.
          body2: {
            fontFamily: '"Roboto Slab", "Courier New", "serif"',
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.00938em',
            lineHeight: 1.5,
          },
        },
      }),
    [darkMode]
  )

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Steven's Portfolio</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {/* Hide Top AppBar on mobile screens */}
          <Hidden xsDown>
            <MyAppBar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              toggleShowDrawer={toggleShowDrawer}
            />
          </Hidden>
          <main className={classes.content}>
            <Hidden xsDown>
              <div className={classes.toolbar} />
            </Hidden>
            <Component {...pageProps} />
            {/* Display bottom AppBar for a better mobile experience */}
            <Hidden smUp>
              <MobileNav darkMode={darkMode} setDarkMode={setDarkMode} />
            </Hidden>
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}
