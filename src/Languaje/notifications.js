// notifications.js
import { Notification } from 'element-ui';

export const notifySuccess = (message) => {
    Notification({
        title: 'Éxito',
        message: message,
        type: 'success'
    });
};

export const notifyError = (message) => {
    Notification({
        title: 'Error',
        message: message,
        type: 'error'
    });
};
export const notifyInfo = (message) => {
    Notification({
        title: 'Info',
        message: message,
        type: 'info'
    });
};