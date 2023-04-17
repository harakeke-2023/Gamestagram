import { cancelUserEvent } from '../apis/apiClientEvents'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { MyEvent } from '../../models/Event'

const MyEventCard = ({
  event,
  fetchMyEvents,
}: {
  event: MyEvent
  fetchMyEvents: (id: number) => Promise<void>
}) => {
  useEffect(() => {
    if (event.status === 'closed') {
      setTextColor('grey')
    }
  }, [event.status])

  const [textColor, setTextColor] = useState('')

   function handleOpen() {
    setOpen(true)
  }

  const [open, setOpen] = useState(false)


  const handleCancel = async (userEventId: number) => {
    await cancelUserEvent(userEventId)
    fetchMyEvents(event.userId)
    setOpen(false)
 
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="border p-2 w-1/3 mb-12" style={{ color: textColor }}>
        <h2 className="mb-4 font-bold text-lg">{event.eventName}</h2>
        <p className="text-purple-500" style={{ color: textColor }}>
          <b className="text-black" style={{ color: textColor }}>Role:</b> player
        </p>
        <p className="text-green-500" style={{ color: textColor }}>
          <b className="text-black" style={{ color: textColor }}>Status:</b> {event.status}
        </p>
        <p>
          <b>Date:</b> {event.time}
        </p>
        <p>
          <b>Location:</b> {event.location}
        </p>
        {event.status === 'open' && (
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-purple-200 rounded-2xl my-3"
          >
            I am not going
          </button>
        )}
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you are not going to this event?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => handleCancel(event.userEventId)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default MyEventCard
