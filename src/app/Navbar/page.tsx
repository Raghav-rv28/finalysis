import Image from 'next/image'
import logoWithSlogan from "../../../public/media/logo/logoWithSlogan.png"
import { Grid } from '@mui/material'
export default function NavBar() {

    return (<Grid container>
        <Image
        src={logoWithSlogan}
        alt="Logo With Slogan"
        color='secondary.dark'
        />
    </Grid>
    )
}