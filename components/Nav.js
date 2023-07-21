import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav className=''>
        <ul className=' flex justify-center items-center gap-4 border border-slate-300 p-4 '>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/students'>All Students</Link></li>
            <li><Link href='/take-exam'>Take Exam</Link></li>
            <li><Link href='/result'>Result</Link></li>
        </ul>
    </nav>
  )
}

export default Nav