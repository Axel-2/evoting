import { Spinner } from "flowbite-react"


const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 gap-10 h-full">
            <Spinner aria-label="Default status example"  size="xl" />
            <p className='font-bold'>Initialisierung. Bitte warten Sie einige Sekunden.</p>
        </div>
    )
}


export default LoadingPage;