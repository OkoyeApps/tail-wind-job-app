
const Footer = () => {
    let date = new Date();
    return (
        <footer className="bg-white w-full md:mt-4 p-8 mt-16">
            <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
                <div className="md:col-span-2 font-bold col-span-2 text-4xl md:text-lg">About us</div>
                <div className="font-bold row-start-3 md:row-start-auto col-span-2 md:col-span-1 text-4xl md:text-lg"> Site map
            </div>
                <div className="font-bold row-start-8 md:row-start-auto text-4xl md:text-lg">Privacy</div>
                <div className="md:col-span-2 row-start-2 col-span-2">
                    <div>we are a team of nurses, doctors, technologist and executives dedicated to help
                       <span className="hidden md:block"><br />nurses find job they love</span>
                        <span className="block md:hidden">nurses find job they love</span>
                    </div>
                    <div>All copyrights reserved &copy; {date.getFullYear()}- Health explore
                </div>
                </div>
                <div className="md:row-span-4 row-start-4 col-span-2 md:col-span-1">
                    <div>Nurses</div>
                    <div>Employers</div>
                    <div>Social networking</div>
                    <div>Jobs</div>
                </div>
                <div className="md:row-span-3 row-start-9 col-span-2 md:row-start-auto md:col-span-1">
                    <div>Terms of use</div>
                    <div>Privacy policy</div>
                    <div>Cookie policy</div>
                    <div>Jobs</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;