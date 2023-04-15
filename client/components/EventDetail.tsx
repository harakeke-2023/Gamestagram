import { useEventStore } from '../store/useEventStore'

import { shallow } from 'zustand/shallow'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function EventDetail() {
  const { id } = useParams()
  const { event, fetchEvent } = useEventStore(
    (state) => ({
      event: state.event,
      fetchEvent: () => state.fetchEvent(Number(id)),
    }),
    shallow
  )

  // fetchEvent()

  useEffect(() => {
    fetchEvent()
  }, [])

  return (
    <section className="my-3 w-5/6">
      <div className="border-black">
        <img src={`${event.gamePhoto}`} alt={`${event.gameName}`} />
      </div>
      {/* <div>
        <img src={`${event.users[0].photoUrl}`} alt="host" />
      </div> */}
      <div className=" float-right flex flex-wrap">
        {event.users.map((user) => {
          return (
            <img
              className="  h-12  rounded-full ring-2 ring-white"
              src={`${user.photoUrl}`}
              alt={`${user.name}`}
              key={user.name}
            />
          )
        })}
      </div>
      <div className="border-black">
        <ul>
          <li>Event Name: {event.eventName}</li>
          <li>Game Name: {event.gameName}</li>
          <li>Description: {event.description}</li>
          <li>Location: {event.location}</li>
          <li>Time: {event.time}</li>
          <li>Number of People: {event.numberOfPeople}</li>
        </ul>
      </div>
    </section>
  )
}

export default EventDetail
