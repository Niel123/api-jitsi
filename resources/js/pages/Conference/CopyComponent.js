import React, { useEffect, useState, useRef } from "react";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

function CopyComponent({data}) {

    const copyLink = () => {
        // alert('copied');
        Swal.fire({
            title: 'Link copied!',
            timer: 2000,
        })
        navigator.clipboard.writeText(data.conference_link)
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={copyLink} color="primary" >
                <FileCopyIcon />
            </Button>
        </React.Fragment>
    );
}

export default CopyComponent;
