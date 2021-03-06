import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Head from 'next/head'
import LinearProgress from '@material-ui/core/LinearProgress'

import { getRepositoryNamesForPaths, getProjectDetails } from '../api/github'
import { ProjectInformation } from '../_app'
import DemoSourceLinks from '../../components/work/DemoSourceLinks'
import ProjectBody from '../../components/work/projectDetails/ProjectBody'
import ProjectDemo from '../../components/work/projectDetails/ProjectDemo'
import ProjectDescription from '../../components/work/projectDetails/ProjectDescription'
import ProjectHeader from '../../components/work/projectDetails/ProjectHeader'

const useStyles = makeStyles(theme => ({
  projectDetailPage__ROOT: {
    paddingBottom: theme.spacing(30),
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.common.defaultLightBackground,
  },
  projectDetailPage__loading: {
    flexGrow: 1,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.common.defaultLightBackground,
  },
  projectDetailPage__container: {
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  projectDetailPage__header: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 3, 0, 3),
    },
  },
  projectDetailPage__body: {
    padding: theme.spacing(3),
  },
  projectDetailPage__demoSourceLinks: {
    padding: theme.spacing(5, 0, 0),
  },
}))

export default function ProjectDetailsPage({ markdown, repo }) {
  const classes = useStyles()
  const [projectInfo, setProjectInfo] = useState({})
  // Step 3a. See instructions from components/work/ProjectInformation.js
  const { weathernautInfo, portfolioInfo, kur8Info } =
    useContext(ProjectInformation)

  if (!markdown || !repo) {
    return <LinearProgress />
  }

  useEffect(() => {
    // Step 3b. See instructions from components/work/ProjectInformation.js
    repo.name === 'Weathernaut' && setProjectInfo(weathernautInfo)
    repo.name === 'Portfolio' && setProjectInfo(portfolioInfo)
    repo.name === 'Kur8' && setProjectInfo(kur8Info)
  }, [repo.name])
  return (
    <>
      <Head>
        <title>Work | {repo.name}</title>
        <meta
          property="description"
          content={`${repo.name} repository details from Steven Del Rosario's Github.`}
        />
      </Head>
      <article className={classes.projectDetailPage__ROOT}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid
            className={classes.projectDetailPage__header}
            item
            xs={12}
            sm={8}
            lg={6}
            xl={4}>
            <ProjectHeader
              projectName={projectInfo.name}
              dateCreated={repo.dateCreated}
              lastUpdated={repo.lastUpdated}
            />
          </Grid>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={11} lg={10} xl={7}>
            <ProjectDemo
              videoPath={projectInfo.videoPath}
              imagePath={projectInfo.imagePath}
            />
          </Grid>
          <ProjectDescription description={repo.description} />
          <Grid
            container
            className={classes.projectDetailPage__demoSourceLinks}
            direction="row"
            justify="center"
            alignItems="center">
            <DemoSourceLinks
              liveDemo={projectInfo.website}
              sourceCode={projectInfo.github}
            />
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Grid
              item
              className={classes.projectDetailPage__body}
              xs={12}
              sm={10}
              md={8}
              lg={6}
              xl={4}>
              <ProjectBody content={markdown} />
            </Grid>
          </Grid>
        </Grid>
      </article>
    </>
  )
}
export async function getStaticProps({ params }) {
  const { markdown, repo } = await getProjectDetails(
    undefined, // Use this to wire up getUserDetails if needed in the future
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
