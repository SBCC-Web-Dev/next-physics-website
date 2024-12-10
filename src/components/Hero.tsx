const Hero: React.FC = () => {
    return (
        <div className="flex relative items-center justify-center bg-[url('/cosmic-cliffs.png')] bg-center bg-fixed bg-black bg-no-repeat bg-cover w-full h-80">
            <div className="flex rounded items-center justify-center bg-[#991c2d] p-2 ">
                <h1 className="font-bold text-4xl">Santa Barbara City College Physics and Engineering</h1>
            </div>
            <div className="absolute right-0 bottom-1 mr-6 text-white text-xs" aria-label="image credits">
                <a href={"https://nasa.gov"} className="p-0.5 bg-black/70 rounded-sm">
                    Credit Nasa JWST
                </a>
            </div>
        </div>
    )
}

export default Hero