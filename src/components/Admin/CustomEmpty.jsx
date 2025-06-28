import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Inbox from '@mui/icons-material/Inbox';
import { CreateButton } from 'react-admin';

export const CustomEmpty = ({message, createBtn}) => {

    return (
        <Root>
            <div className={EmptyClasses.message}>
                <Inbox className={EmptyClasses.icon} />
                <Typography variant="h4" paragraph>
                    {message}
                </Typography>
								{createBtn ? <CreateButton label={createBtn}/> : ''}
            </div>
        </Root>
    );
};

const PREFIX = 'RaEmpty';

export const EmptyClasses = {
    message: `${PREFIX}-message`,
    icon: `${PREFIX}-icon`,
    toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('span', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    flex: 1,
    [`& .${EmptyClasses.message}`]: {
        textAlign: 'center',
        opacity: theme.palette.mode === 'light' ? 0.5 : 0.8,
        margin: '0 1em',
        color:
            theme.palette.mode === 'light'
                ? 'inherit'
                : theme.palette.text.primary,
    },

    [`& .${EmptyClasses.icon}`]: {
        width: '9em',
        height: '9em',
    },

    [`& .${EmptyClasses.toolbar}`]: {
        textAlign: 'center',
        marginTop: '2em',
    },
}));
