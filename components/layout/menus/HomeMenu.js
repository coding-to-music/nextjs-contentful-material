import { useState } from 'react'
import Router from 'next/router'
import NextLink from 'next/link'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../Logo'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}



const logoColor = '#144d53'

function HomeMenu({drawerWidth}) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue)
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault()
          if (props.label === 'home') {
            Router.push(`/`)
          } else {
          Router.push(`/${props.label}`)
          }
        }}
        {...props}
      />
    );
  }

  const useStyles = makeStyles(theme => ({
    listItem: {
      textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar,
    drawerLogo: {
      marginBottom: '-64px',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
      minWidth: drawerWidth
    }
  }))
  const classes = useStyles()
  return (
    <>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item className={classes.drawerLogo}>
          <NextLink href='/'>
            <ButtonBase component='a' disableRipple>
              <Logo height='30px' width='30px' color={logoColor} />
            </ButtonBase>
          </NextLink>
        </Grid>
      </Grid>
      <div className={classes.toolbar} />
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="home menu tabs"
        className={classes.tabs}
      >
        <LinkTab className={classes.tab} label="home" {...a11yProps(0)} />
        <LinkTab className={classes.tab} label="work" {...a11yProps(0)} />
        <LinkTab className={classes.tab} label="blog" {...a11yProps(1)} />
        <LinkTab className={classes.tab} label="self" {...a11yProps(2)} />
        <LinkTab className={classes.tab} label="mail" {...a11yProps(3)} />
      </Tabs>
    </>
  )
}

export default HomeMenu

// <ListItem className={classes.listItem} button key='Github'>
// <ListItemText primary='Github' />
// </ListItem>
// <ListItem className={classes.listItem} button key='NextLinkedIn'>
// <ListItemText primary='NextLinkedIn' />
// </ListItem>
// <ListItem className={classes.listItem} button key='Resume'>
// <ListItemText primary='Resume' />
// </ListItem>
