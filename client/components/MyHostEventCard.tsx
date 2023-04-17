import { Link } from 'react-router-dom'
import { MyEvent } from '../../models/Event'
import { cancelEvent } from '../apis/apiClientEvents'
import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

const MyEventCard = ({
  event,
  fetchMyEvents,
}: {
  event: MyEvent
  fetchMyEvents: (id: number) => Promise<void>
}) => {
  const [textColor, setTextColor] = useState('')


  useEffect(() => {
    if (event.status === 'closed') {
      setTextColor('grey')
    }
  }, [event.status])

  async function handleCancel() {
    await cancelEvent(event.eventId)
    fetchMyEvents(event.userId)
    setOpen(false)
  }


  function handleOpen() {
    setOpen(true)
  }

  const [open, setOpen] = useState(false)



  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
    <div className="border p-2 w-1/3 mb-12" style={{ color: textColor }}>
      <h2 className="mb-4 font-bold text-lg">{event.eventName}</h2>
      <p className="text-blue-500" style={{ color: textColor }}>
        <b className="text-black" style={{ color: textColor }}>
          Role:
        </b>{' '}
        host
      </p>
      <p className="text-green-500" style={{ color: textColor }}>
        <b className="text-black" style={{ color: textColor }}>
          Status:
        </b>{' '}
        {event.status}
      </p>
      <p>
        <b>Date:</b>
        {event.time}
      </p>
      <p>
        <b>Location:</b> {event.location}
      </p>
      {event.status === 'open' && (
        <>
          <Link to={`/events/${event.eventId}/edit`}>
            <button className="px-4 py-2 bg-purple-200 rounded-2xl my-3">
              Edit Event
            </button>
          </Link>
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-purple-200 rounded-2xl my-3 mx-4"
          >
            Cancel Event
          </button>
        </>
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
            {'Are you sure you want to cancel this event?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleCancel} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </>
  )
}

export default MyEventCard