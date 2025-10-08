import { NavLink } from "react-router-dom"

 export const Error = () =>{
   return(
    <>
        <section id ="error-page">
            <div className="container content">
                <h2 className="header">404
                </h2>
                <h4> Sorry! page not found
                </h4>
                <p>
                    oops! It seems like the page you are looking for access doesn't exist.If you believe there's an issue,feel free to report it,and we'Will look into it.
                </p>
                <div className="btns">
                    <NavLink to ="/">
                        return home
                    </NavLink>
                    <NavLink to ="/contact">report problem</NavLink>
                </div>
            </div>
        </section>
    </>
   )
 } 
 export default Error;