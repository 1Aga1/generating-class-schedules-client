import {ISubjectForm} from "../../types/forms";


export interface ISubjectModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: ISubjectForm) => void,
    initialValues?: ISubjectForm,
    submitText?: string,
    titleText?: string,
    loading?: boolean
}