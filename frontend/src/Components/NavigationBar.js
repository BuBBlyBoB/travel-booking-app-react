import { Link } from "react-router-dom";

export default function Nav () {
    return(
      <div>
        <nav>
          <div className="title"> Adventure Aisle</div>
          <ul>
            <li><Link to={"#"}>Home</Link></li>
            <li><Link to={"#"}>Book a trip</Link></li>
            <li><Link to={"#about"}>About Us</Link></li>
          </ul>
        </nav>
      </div>
  
    )
}