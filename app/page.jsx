import Link from "next/link";

const Homepage = () => {
  return (
    <div>
      <Link href='/dashboard'>
        <button>Go to Dashboard</button>
      </Link>

    </div>

  )
}

export default Homepage