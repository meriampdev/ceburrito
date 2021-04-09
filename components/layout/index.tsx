import Header from './header'
import Footer from './footer'

interface IProps {
  children: any
}
export default function Layout(props: IProps) {
  return (
    <div className="app-layout">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}