import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {

    return (
        <footer>
           <center> 
                <div class="card1">
                    <div class="card-info">
                        <p class="title"><Link to="/create">Notes</Link></p>
                    </div>
                </div>
                <div class="card1">
                    <div class="card-info">
                        <p class="title"><Link to="/translator">Translation</Link></p>
                    </div>
                </div>
            </center>
        </footer>
    )
}
