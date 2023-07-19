import { Link } from "react-router-dom"


const Footer = () => {
    return(
    <footer>
        <div className="footer-content">
            <p>skupina Dilnex</p>
            <Link className="personaldata-link" to="/personaldata">ochrana osobnich udaju</Link>
            <div>
                <p>spřátelené stránky</p>
            <a href="https://tomasopl.cz/"><img alt="OplLogo" src="https://tomasopl.cz/wp-content/uploads/2021/08/cropped-logo-tomas-opl-good-e1629285137339.png" ></img></a>
            </div>
        </div>
    </footer>
    )
}

export default Footer