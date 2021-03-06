import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Head from 'next/head'
import React from 'react'

import { AboutDark, AboutLight } from '../components/home/About'
import { ExploreDark, ExploreLight } from '../components/home/Explore'
import { HangoutDark, HangoutLight } from '../components/home/Hangout'
import { PartyDark, PartyLight } from '../components/home/Party'
import { WorkDark, WorkLight } from '../components/home/Work'
import PageIntro from '../components/PageIntro'
import StoryImage from '../components/home/StoryImage'

const useStyles = makeStyles(theme => ({
  mainIndex__ROOT: {
    minHeight: '100vh',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.common.defaultLightBackground,
  },
  mainIndex__storyImageContainer: {
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
    },
  },
}))

const heroParagraph = `
You just found the front page of my life. Chances are, if you're reading
this—it may already be too late. Or maybe not. Maybe this is the right
time and it was all meant to be. Regardless, I made this for you.
`

const aboutText = `
I’m Steven. I designed and developed this site. Here’s a quick rundown:
the two big pages in this portfolio are Work and Blog. I customized the
markdown renderer that Material UI uses for its official docs in order to
render the markdown from each project’s readme. Blog uses Contentful as a
headless CMS and its design was heavily influenced by Ghost and Medium.
All vector art comes from Katerina Limpitsouni's Undraw.co community. Kudos
to her, for real. An open source community for designers. What a great idea.
`

const partyText = `
I’m a people person. You could put me in a multitude of situations, with
nearly any kind of personality type, and I could develop banter, establish
rapport, and build strong connections with strangers with little to no
effort. Some of the best work that I’ve done has come from working within
a relatively small teams. If the vibe is right and everyone is driven, the
possibility for the group to enter a state of "flow” is a huge motivator
for me.
`

const exploreText = `
I always find a way to balance out the time I spend sitting at a desk
with doing something active. Back before all the travel restrictions, I
would routinely make plans to visit different cities and check out all the
national parks. Regardless of who I'm with, give me some funny podcasts,
an audiobook or two, and a long road—and I'm good to go.
`

const hangoutText = `
I’m fairly inquisitive. If something piques my interest, it doesn’t take
much to allow my curiosity to take over. In conversation, I enjoy quick
exchanges filled with clever quips and references as much as anyone. But
I really prefer going in-depth. If the world we live in was built on the
stories we share, you could find me at the forefront of nuance, happily
chipping away at the ineffable.
`

const workText = `
And here I am now. With the pandemic in full swing, I’ve been making the
most of it. Each day, the hours seem to literally melt away as I solve
problem after problem. Web development is unlike anything I've ever done.
I’m glad you’re able to see this portfolio. It’s been a labor of love, but
if it’s anything like writing, I’ll look back on this in a few months and
cringe. Anyway, checkout the footer to find my contact info. Feel free to
hit up Mail and say hello. Enjoy.
`

// const defaultParagraph = `
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
// eiusmod tempor incididunt ut labore et dolore magna aliqua.
// Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
// Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
// gravida rutrum quisque non tellus. Convallis convallis tellus id
// interdum velit laoreet id donec ultrices. Odio morbi quis commodo
// odio aenean sed adipiscing.
// `

const imageTextArray = [
  [<AboutDark />, <AboutLight />, aboutText],
  [<PartyDark />, <PartyLight />, partyText],
  [<ExploreDark />, <ExploreLight />, exploreText],
  [<HangoutDark />, <HangoutLight />, hangoutText],
  [<WorkDark />, <WorkLight />, workText],
]

export default function Index() {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Steven | About Me</title>
        <meta
          name='description'
          content={`This is the About Me section of Steven Del Rosario's self-developed website`}
        />
      </Head>
      <article id='MainIndexBody' className={classes.mainIndex__ROOT}>
        <PageIntro title='Hello' paragraph={heroParagraph} />
        <Container
          className={classes.mainIndex__storyImageContainer}
          maxWidth='lg'>
          {imageTextArray.map((item, index) => {
            return (
              <StoryImage
                key={index}
                darkModeImage={item[0]}
                lightModeImage={item[1]}
                text={item[2] ? item[2] : defaultParagraph}
                imageOrientation={index % 2 === 0 ? 'left' : 'right'}
              />
            )
          })}
        </Container>
      </article>
    </>
  )
}
