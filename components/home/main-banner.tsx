import Link from 'next/link'

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div id="shopnow" className="w-full flex items-center justify-center">
        <div id="btn" className="font-bold flex items-center justify-center text-3xl">
          <Link href='/shop'>
            <a href="/shop">
              Shop Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}