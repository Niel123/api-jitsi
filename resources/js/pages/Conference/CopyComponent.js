import React, { useEffect, useState, useRef } from "react";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

function CopyComponent({data}) {
    const [open, setOpen] = React.useState(false);

    const copyLink = () => {
        setOpen(true);
        navigator.clipboard.writeText(data.conference_name)
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Tooltip title="Copy  Code" aria-label="copy">
            <Button color="primary" onClick={copyLink} color="primary" >
                <FileCopyIcon />
            </Button>
            </Tooltip>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Link copied!"
            />
        </React.Fragment>
    );
}

export default CopyComponent;
