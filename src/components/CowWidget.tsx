// import { CowEventListeners, CowEvents, ToastMessageType } from '@cowprotocol/events'
import { CowSwapWidgetParams, TradeType, CowSwapWidget, CowSwapWidgetProps } from '@cowprotocol/widget-react'
import { CowEvents, CowEventListeners } from '@cowprotocol/events'

import { useMemo, useState } from 'react'
import { Box, Button, Snackbar } from '@mui/material'

export function CowWidget(props: CowSwapWidgetProps) {
  const { provider, params } = props

  const [toasts, setToasts] = useState<String[]>([])
  const toast = toasts.length > 0 ? toasts[0] : undefined

  const openToast = (message: string) => {
    setToasts((t) => [...t, message])
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setToasts((t) => t.slice(1))
  }

  const listeners = useMemo<CowEventListeners>(() => {
    return [
      {
        event: CowEvents.ON_TOAST_MESSAGE,
        handler: (event) => {
          console.info('🍞 New toast message:', event)
          openToast(event.message)
        },
      },
    ]
  }, [openToast])

  console.log('CowWidget', params.partnerFee)
  return (
    <Box>
      <Snackbar open={toasts.length > 0} autoHideDuration={6000} onClose={handleClose} message={toast} />
      <CowSwapWidget params={params} provider={provider} listeners={listeners} />
    </Box>
  )
}
