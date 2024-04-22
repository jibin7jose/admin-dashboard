import Link from "next/link";

const Homepage = () => {
  return (
    <div>
      <Link href='/login'>
        <button>Go to Login</button>
      </Link>

    </div>

  )
}

export default Homepage