const Navbar = () => {
    return (
        <div>
            <nav className='nav'>
                <a href='https://www.reddit.com/r/wallstreetbets/'>r/wallstreetbets</a>
                <a href='https://www.google.com/finance/quote/AMC:NYSE'>AMC</a>
                <a href='https://www.google.com/finance/quote/BB:NYSE'>BB</a>
                <a href='https://www.google.com/finance/quote/GME:NYSE'>GME</a>
                <a href='https://www.google.com/finance/quote/NOK:NYSE'>NOK</a>
            </nav>
            <div className='backdrop'>
                <div className='banner'></div>
            </div>
        </div>
    )
}

export default Navbar