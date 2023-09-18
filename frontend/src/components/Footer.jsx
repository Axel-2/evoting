import { Footer } from "flowbite-react"

//  Diese Datei stellt den Footer meiner Website dar. Der untere Teil.

const FooterComp = () => {
    return (
        <Footer container>
        <Footer.Copyright
          by='Axel Verga'
          href='#'
          year={2023}
        />
      </Footer>
    )
}

export default FooterComp