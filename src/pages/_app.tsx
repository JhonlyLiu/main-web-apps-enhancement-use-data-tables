// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** React Imports
import { useState } from 'react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/main/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/main/layouts/UserLayout'
import ThemeComponent from 'src/main/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/main/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/main/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { RouteGuard } from 'src/components/security/RouteGuard'
import Lockscreen from 'src/components/Lockscreen'
import { useIdleTimer } from 'react-idle-timer'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const [idle, setIdle] = useState(false)

  /**
   * onIdle
   * handle set state onIdle to true
   */
  const onIdle = () => {
    setIdle(true)
  }

  /**
   * onActive
   * handle set state onIdle to false
   */
  const onActive = () => {
    setIdle(false)
  }

  const checkIdle = useIdleTimer({
    timeout: 300000,
    onIdle,
    onActive,
    throttle: 500
  })

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <RouteGuard>
      {
        idle ? <Lockscreen/> : <></>
      }
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{themeConfig.templateName}</title>
            <meta
              name='description'
              content={`${themeConfig.templateName} – Hospital Information System.`}
              />
            <meta name='keywords' content='Siloam Hospital - Hospital Information System' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </RouteGuard>
  )
}

export default App
