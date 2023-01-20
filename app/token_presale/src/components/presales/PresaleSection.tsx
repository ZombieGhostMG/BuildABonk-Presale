import PresaleList from './PresaleList'

const PresaleSection = ({ title, presales, action }) => {
    return (
        <div className={""}>
            <h1 className="">
                {title} - {presales.length}
            </h1>

            <PresaleList presales={presales} action={action} />
        </div>
    )
}

export default PresaleSection
