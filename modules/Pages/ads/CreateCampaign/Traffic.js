import React, {useState} from "react";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import {FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField, Grid} from "@material-ui/core";

const Traffic = ({}) => {
    const [traffic, setTraffic] = useState("");
    const [website, setWebsite] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    return (
        <CmtCard>
            <CmtCardHeader title={'Traffic'}/>
            <CmtCardContent>
                <Grid item md={6} lg={6} sm={12} xs={12}>
                    <FormControl fullWidth component="fieldset">
                        <RadioGroup
                            aria-label="Traffic"
                            defaultValue="website"
                            name="radio-buttons-group"
                            value={traffic}
                            onChange={event => setTraffic(event.target.value)}
                        >
                            <FormControlLabel value="website" control={<Radio/>} label="Website"/>
                            <TextField fullWidth disabled={traffic != 'website'} value={website} id="website-value"
                                       label="Website" onChange={event => setWebsite(event.target.value)}
                                       variant="outlined"/>
                            <FormControlLabel className='mt-4' value="whatsapp" control={<Radio/>} label="Whatsapp"/>
                            <TextField fullWidth disabled={traffic != 'whatsapp'} value={whatsapp} id="whatsapp-value"
                                       label="Whatsapp" onChange={event => setWhatsapp(event.target.value)}
                                       variant="outlined"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </CmtCardContent>
        </CmtCard>
    )
}

export default Traffic;
