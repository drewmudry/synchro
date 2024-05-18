import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-2">
        <Link href={`/users/${1}`}>user 1</Link>
        <Link href={`/users/${2}`}>user 2</Link>
    </div>
  )
}

export default page;