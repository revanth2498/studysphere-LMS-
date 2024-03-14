import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo1 from "../../../assets/images/studysphere.png"
import Logo from './../../../ui-component/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            {/* <Logo /> */}
            <img style={{ width: "60%", height: "5%", marginLeft: "30%", marginTop: "-11%", marginBottom: "-25%" }}
                src={Logo1}
                alt='study sphere'
                loading="lazy"
            />
            {/* <Typography variant="h3">DDU</Typography> */}

        </ButtonBase>
    );
};

export default LogoSection;
