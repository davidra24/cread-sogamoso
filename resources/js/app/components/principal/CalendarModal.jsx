import React from 'react';
import Modal from '../modal/Modal';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/es';

function CalendarModal(props) {
    const locale = 'es';
    return (
        <Modal isOpen={props.isOpen} onCloseModal={props.onCloseModal}>
            <DayPicker
                localeUtils={MomentLocaleUtils}
                locale={locale}
                selectedDays={props.selectedDays}
                onDayClick={props.onDayClick}
            />
        </Modal>
    );
}

export default CalendarModal;
