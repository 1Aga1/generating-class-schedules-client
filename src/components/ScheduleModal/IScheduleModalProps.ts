import {IScheduleForm} from "../../types/forms";

export interface IScheduleModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: IScheduleForm) => void,
    initialValues?: IScheduleForm,
    submitText?: string,
    titleText?: string,
    loading?: boolean
}