import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';
import { signIn, signOut, getSession } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cart from './cart'
import Dropdown from '../common/dropdown'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'capitalize',
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    fontWeight: 'bold',
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    borderRadius: 20,
    color: "#460354"
  },
  text: {
    color: "#460354"
  }
}));
export default function Header() {
  const classes = useStyles();
  const router = useRouter()
  const [ session, setSession ] = useState(null)

  useEffect(() => {
    (async () => {
      const userSession = await getSession()
      if(userSession) {
        setSession(userSession.user)
      }
    })()
  }, [])

  const onLocate = (data) => {
    const locationData = jwt.sign({ data: data }, 'secret')
    router.push({
      pathname: '/locator',
      query: { data: locationData },
    })
  }

  return (
    <header className="p-5">
      <div id="desktop-header" className="hidden md:grid justify-between items-center px-5">
        <div id="brand" className="flex flex-row gap-7 items-end">
          <div className="cursor-pointer">
            <Link href='/'>
              <img src="/images/ceburrito-logo_dark-set.png" alt="" />
            </Link>
          </div>
          {/* <Button className={classes.button} variant="contained" color="secondary">Find Ceburritos</Button> */}
          <Dropdown
            label="Find Ceburritos"
            className={classes.button} variant="contained" color="secondary"
            menuList={[
              { 
                label: "Cebu City", 
                onClick:() => onLocate({ 
                  name: "Cebu City", 
                  coords: {lat: 10.2833322, lng: 123.899996},
                  ceburritos: [
                    { name: "IT Park", coords: {lat: 10.3297, lng: 123.9072} },
                    { name: "Ayala Center", coords: {lat: 10.317332064, lng: 123.902996388} },
                    { name: "SM City", coords: {lat: 10.30666544, lng: 123.91749633} },
                  ]
                }) 
              },
              { label: "Mandaue City", onClick:() => onLocate({ name: "Mandaue City", coords: {lat: 10.333332, lng: 123.9333296} }) },
              { label: "Lapu-lapu City", onClick:() => onLocate({ name: "Lapu-lapu City", coords: {lat: 10.31028, lng: 123.94944} }) },
              { label: "Ormoc City", onClick:() => onLocate({ name: "Ormoc City", coords: {lat: 11.00639, lng: 124.6075} }) }
            ]}
          />
        </div>
        <nav className="flex flex-row justify-start items-end gap-5">
          <Link href="/menu">
            <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5'>
              <span className={clsx("text-lg font-bold", classes.text)}>Menu</span>
            </div>
          </Link>
          <Link href="/catering">
            <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5'>
              <span className={clsx("text-lg font-bold", classes.text)}>Catering</span>
            </div>
          </Link>
          <Link href="/nutrition">
            <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5'>
              <span className={clsx("text-lg font-bold", classes.text)}>Nutrition</span>
            </div>
          </Link>
          <Link href="/about-us">
            <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5'>
              <span className={clsx("text-lg font-bold", classes.text)}>Who We Are</span>
            </div>
          </Link>
        </nav>
        <div className="flex flex-row items-center justify-end gap-5">
          { !session && <Button onClick={() => signIn()} className={classes.button} startIcon={<Person />}>Sign In</Button> }
          {/* { session && <Button onClick={() => signIn()} className={classes.button}>{`${session?.name}`}</Button> } */}
          { session && 
            <Dropdown 
              label={`${session?.name}`} 
              menuList={[
                { label: 'Profile', onClick:()=>{} },
                { label: 'Sign Out', onClick:()=> { signOut() } }
              ]} 
              endIcon={<Person />}
            /> 
          }
          <Cart />
        </div>
      </div>
    </header>
  )
}