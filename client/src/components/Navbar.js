const Navbar = () => {
    return (
        <div>
            <nav className='nav'>
                <a href='https://www.reddit.com/r/wallstreetbets/'>r/wallstreetbets</a>
                <a href='https://www.google.com/finance/quote/AMC:NYSE' target="_blank" rel="noopener noreferrer">AMC</a>
                <a href='https://www.google.com/finance/quote/BB:NYSE' target="_blank" rel="noopener noreferrer">BB</a>
                <a href='https://www.google.com/finance/quote/GME:NYSE' target="_blank" rel="noopener noreferrer">GME</a>
                <a href='https://www.google.com/finance/quote/NOK:NYSE' target="_blank" rel="noopener noreferrer">NOK</a>
            </nav>
            <div className='backdrop'>
                <div className='banner'></div>
            </div>
        </div>
    )
}

export default Navbar