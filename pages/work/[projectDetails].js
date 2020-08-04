import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Head from 'next/head'

import { getRepositoryNamesForPaths, getProjectDetails } from '../api/github'
import { weathernautInfo } from './index'
import Body from '../../components/work/ProjectDetailsPage/Body'
import DemoSourceLinks from '../../components/work/DemoSourceLinks'
import Description from '../../components/work/ProjectDetailsPage/Description'
import Header from '../../components/work/ProjectDetailsPage/Header'
import Image from '../../components/work/ProjectDetailsPage/Image'

const useStyles = makeStyles(theme => ({
  rootArticle_ProjectDetails: {
    paddingBottom: theme.spacing(30),
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.common.defaultLightBackground,
  },
  header: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 3, 0, 3),
    },
  },
  demoSourceLinks: {
    padding: theme.spacing(5, 0, 0),
  },
  mainContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  }
}))

export default function ProjectDetailsPage({ markdown, repo }) {
  const classes = useStyles()
  if (!markdown || !repo) {
    return <div>Loading...</div>
  }
  return (
    <article className={classes.rootArticle_ProjectDetails}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid className={classes.header} item xs={12} sm={8} lg={6} xl={4}>
          <Header
            projectName={repo.name}
            dateCreated={repo.dateCreated}
            lastUpdated={repo.lastUpdated}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction='column'
        justify='space-between'
        alignItems='center'>
        <Grid item xs={12} sm={11}>
          <Container maxWidth='lg' className={classes.mainContainer}>
            <Image
              title={repo.name}
              imagePath={weathernautInfo.imagePath}
              website={repo.website}
            />
            <Description description={repo.description} />
            <Grid
              container
              className={classes.demoSourceLinks}
              direction='row'
              justify='center'
              alignItems='center'>
              <DemoSourceLinks
                liveDemo={repo.website}
                sourceCode={repo.github}
              />
            </Grid>

            <Body content={markdown} />

          </Container>
        </Grid>
      </Grid>
    </article>
  )
}
export async function getStaticProps({ params }) {
  const { markdown, repo } = await getProjectDetails(
    undefined,
    params.projectDetails
  )

  return {
    props: { markdown, repo },
  }
}

export async function getStaticPaths() {
  const { paths } = await getRepositoryNamesForPaths()
  return {
    paths: paths?.map(repositoryName => `/work/${repositoryName}`) ?? [],
    fallback: true,
  }
}