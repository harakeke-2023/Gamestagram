import { useEventStore } from '../store/useEventStore'

import { shallow } from 'zustand/shallow'
import { getUserById } from '../apis/apiClientUsers'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addUserEvent } from '../apis/apiClientEvents'
import { useGameStore } from '../store/useGameStore'
import ImageBanner from './subcomponents/ImageBanner'
import { Link } from 'react-router-dom'

function EventDetail() {
  const [host, setHost] = useState({
    photoUrl: '',
  })
  const { id } = useParams()
  const { event, fetchEvent } = useEventStore(
    (state) => ({
      event: state.event,
      fetchEvent: () => state.fetchEvent(Number(id)),
    }),
    shallow
  )

  const { game, fetchGame } = useGameStore(
    (state) => ({ game: state.game, fetchGame: state.fetchGame }),
    shallow
  )

  useEffect(() => {
    fetchGame(event.gameId)
    fetchEvent()
    calculatePlayer()
    if (event.hostId) {
      fetchHost(event.hostId)
    }
  }, [event.hostId])

  async function fetchHost(id: number) {
    const host = await getUserById(id)

    setHost(() => ({
      photoUrl: host.photoUrl,
    }))
  }

  async function handleSumbit() {
    await addUserEvent({ eventId: Number(id), userId: 1 })
  }

  function calculatePlayer(): number {
    const remainingPlayer = game.playerCount - event.numberOfPeople
    return remainingPlayer
  }

  return (
    <>
      <ImageBanner name="Events" url="/pics/banner3.jpg" />

      <div className="my-4  mx-auto w-3/5 ">
        <div className=" rounded-lg flex justify-center">
          <img
            className="rounded-2xl w-1/3"
            src={`${event.gamePhoto}`}
            alt={`${event.gameName}`}
          />
        </div>
        <div className="flex justify-center text-center mt-4">
          <ul>
            <li className=" font-bold font-pacifico text-3xl">
              {event.eventName}
            </li>
            <li className="italic text-lg"> {event.gameName}</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col text-left mt-4">
            <ul>
              <li>
                <span className="font-bold">Description:</span>{' '}
              </li>
              <li>
                <span className="font-bold">Location:</span>
              </li>
              <li>
                <span className="font-bold">Time:</span>
              </li>
              <li>
                <span className="font-bold">Suggested Players:</span>{' '}
              </li>
            </ul>
          </div>
          <div className="flex flex-col text-left mt-4">
            <ul>
              <li> {event.description}</li>
              <li> {event.location}</li>
              <li> {event.time}</li>
              <li> {event.numberOfPeople}</li>
            </ul>
          </div>
        </div>
        <div className=" ">
          <div className="flex justify-between items-center space-x-2 text-base">
            <div>
              <h4 className="font-semibold text-slate-900">Host</h4>
            </div>
            <div className="flex flex-row-reverse">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {event.users.length}
              </span>
              <h4 className="font-semibold text-slate-900">Players</h4>
            </div>
          </div>
          <div className="flex justify-between">
            <div className=" text-right sm:h-32 h-10">
              <img
                className=" inline-block w-2/3 h-1/2 rounded-full ring-2 ring-white"
                src={`${host.photoUrl}`}
                alt="host"
              />
            </div>
            <div className=" flex flex-row-reverse">
              {event.users.map((user) => {
                return (
                  <div key={user.name} className=" text-right sm:h-32 h-14">
                    <img
                      className=" inline-block w-2/3 h-1/2 rounded-full ring-2 ring-white"
                      src={`${user.photoUrl}`}
                      alt={`${user.name}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* {event.numberOfPeople < game.playerCount ? (
        <>
          <h4>Space Left</h4>
          <p className="my-2 text-center">
            {remainingPlayer} of {game.playerCount}
          </p>
        </>
      ) : (
        <p>No Space Left</p>
      )} */}
        <div className="flex float-right w-1/3 my-5 justify-between">
          {event.users.find((e) => e.userId === 1) ? (
            <button className="w-2/5 py-4 text-center  bg-purple-300 drop-shadow-md  hover:drop-shadow-xl rounded-lg text-sm">
              You are going
            </button>
          ) : (
            <button
              onClick={handleSumbit}
              className="w-2/5 py-4 text-center  bg-stone-300 drop-shadow-md hover:bg-stone-400 hover:drop-shadow-xl rounded-lg text-sm"
            >
              Join
            </button>
          )}

          <button className="w-2/5 py-4 text-center  bg-stone-300 drop-shadow-md hover:bg-stone-400 hover:drop-shadow-xl rounded-lg text-sm">
            Message
          </button>
        </div>
        <div className="flex float-left w-1/3 my-5 ">
          <Link
            className="w-2/5 py-4 text-center  bg-purple-300 drop-shadow-md  hover:drop-shadow-xl rounded-lg text-sm"
            to={'/events'}
          >
            Return to all events
          </Link>
        </div>
      </div>
    </>
  )
}

export default EventDetail
