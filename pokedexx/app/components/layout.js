import Footer from "./footer"
import Navbar from "./navbar"

export default function Layout({ children }) {
    return(
        <>
            <Navbar />
            <main className="main-container">{children}</main>
            <Footer />
        </>
    )
}