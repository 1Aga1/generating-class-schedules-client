import {ITeacherForm} from "../../types/forms";


export interface ITeacherModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: ITeacherForm) => void,
    initialValues?: ITeacherForm,
    submitText?: string,
    titleText?: string,
    loading?: boolean
}